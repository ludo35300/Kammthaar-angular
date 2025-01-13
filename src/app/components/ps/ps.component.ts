import { Component } from '@angular/core';
import { faArrowRight, faMoon, faSolarPanel, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { ControllerService } from '../../services/controller/controller.service';
import { Controller } from '../../modeles/controller';
import { BehaviorSubject, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { PsService } from '../../services/ps/ps.service';
import { Ps } from '../../modeles/ps';


@Component({
  selector: 'app-ps',
  templateUrl: './ps.component.html',
  styleUrl: './ps.component.scss'
})
export class PsComponent {
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  psData$: BehaviorSubject<Ps | null> = new BehaviorSubject<Ps | null>(null);

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
    private controllerService: ControllerService,
    private psService: PsService
  ){}

  ngOnInit(): void {
    // on charge les données hors ligne pour eviter le temps d'attente
    this.getLastControllerData();
    this.getLastPsData(); 

    this.serveurService.checkServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.fetchRealtimeData();
        }else {
            this.getLastControllerData();
            this.getLastPsData();  
        }
      });
  }
  // Requêtes en temps réel avec une pause de 1 seconde entre elles
    fetchRealtimeData() {
      const realtimeRequests = [
        () => this.getControllerRealtime(),
        () => this.getPsRealtime()
      ];
    
      realtimeRequests.reduce((chain, request) => {
        return chain.pipe(
          concatMap(() => request()), // Exécuter chaque requête séquentiellement
          concatMap(() => timer(1000)) // Ajouter une pause de 1 seconde
        );
      }, timer(0)).subscribe();
    }

  // Récupération des infos du controller pour récupére la date
  getControllerRealtime(): Observable<Controller> {
    return this.controllerService.getControllerRealtime().pipe(
      map((data) => {
        this.controllerData$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
    }
  // On récupère les dernières données du controlleur enregistrées
  getLastControllerData(){
    this.controllerService.getLastController().subscribe({
      next: (data) => {
        this.controllerData$.next(data);
        this.isLoading = false;
      }
    });
  }
  getPsRealtime(): Observable<Ps> {
      return this.psService.getPsData().pipe(
        map((data) => {
          this.psData$.next(data); // Mettre à jour via BehaviorSubject
          return data;
        })
      );
    }
  // On récupère les dernières données du controlleur enregistrées
  getLastPsData(){
    this.psService.getLastPsData().subscribe({
      next: (data) => {
        this.psData$.next(data);
      },
    });
  }
}