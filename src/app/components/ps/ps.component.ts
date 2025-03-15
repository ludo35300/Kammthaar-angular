import { Component } from '@angular/core';
import { faArrowRight, faMoon, faSolarPanel, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BehaviorSubject, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { SolarDataService } from '../../services/solarData/solar-data.service';
import { SolarData } from '../../modeles/solarData';

@Component({
  selector: 'app-ps',
  templateUrl: './ps.component.html',
  styleUrl: './ps.component.scss'
})
export class PsComponent {
  solarData$: BehaviorSubject<SolarData | null> = new BehaviorSubject<SolarData | null>(null);

  isServerOnline: boolean = false;
  selectedLabel: string  = "Voltage";
  isLoading = true;
  
  faSolarPanel = faSolarPanel
  faSun = faSun
  faMoon = faMoon
  faArrowRight = faArrowRight


  onLabelSelected(label: string) {
    this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
  }

  constructor(
    private serveurService: ServeurService,
    private solarDataService: SolarDataService
  ){}

  ngOnInit(): void {
    // on charge les données hors ligne pour eviter le temps d'attente
    this.getSolarDataLast(); 

    this.serveurService.checkServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.fetchRealtimeData();
        }
      });
  }
  // Requêtes en temps réel avec une pause de 1 seconde entre elles
    fetchRealtimeData() {
      const realtimeRequests = [
        () => this.getSolarDataRealtime()
      ];
    
      realtimeRequests.reduce((chain, request) => {
        return chain.pipe(
          concatMap(() => request()), // Exécuter chaque requête séquentiellement
          concatMap(() => timer(1000)) // Ajouter une pause de 1 seconde
        );
      }, timer(0)).subscribe();
    }

  getSolarDataRealtime(): Observable<SolarData> {
      return this.solarDataService.getSolarDataRealtime().pipe(
        map((data) => {
          this.solarData$.next(data); // Mettre à jour via BehaviorSubject
          return data;
        })
      );
    }
  // On récupère les dernières données du controlleur enregistrées
  getSolarDataLast(){
    this.solarDataService.getSolarDataLast().subscribe({
      next: (data) => {
        this.solarData$.next(data);
      },
    });
  }
}