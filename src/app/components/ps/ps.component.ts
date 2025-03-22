import { Component } from '@angular/core';
import { faArrowRight, faMoon, faSolarPanel, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BehaviorSubject, distinctUntilChanged, interval, map, Observable, Subscription, switchMap } from 'rxjs';
import { SolarDataService } from '../../services/solarData/solar-data.service';
import { SolarData } from '../../modeles/solarData';


@Component({
  selector: 'app-ps',
  templateUrl: './ps.component.html',
  styleUrl: './ps.component.scss'
})
export class PsComponent {
  solarData$: BehaviorSubject<SolarData | null> = new BehaviorSubject<SolarData | null>(null);
  private dataIntervalSubscription: Subscription | null = null;

  private serverStatusSubscription: Subscription | null = null;
  isServerOnline: boolean = false;
  
  selectedLabel: string  = "Puissance";
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


    this.serverStatusSubscription = this.serveurService.serverStatus$.subscribe(status => {
      this.isServerOnline = status;
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.startRealTimeDataUpdate();
        }else {
            this.getSolarDataLast();  
            this.stopRealTimeDataUpdate();
        }
      });
  }
  
  // Fonction pour obtenir les données en temps réel et les mettre à jour toutes les 10 secondes
  startRealTimeDataUpdate(): void {
    if (!this.dataIntervalSubscription) {
      this.dataIntervalSubscription = interval(5000) // Chaque 10 secondes
        .pipe(
          switchMap(() => this.solarDataService.getSolarDataRealtime()) // Récupère les données en temps réel
        )
        .subscribe({
          next: (data) => {
            this.solarData$.next(data); // Mettre à jour via BehaviorSubject
          },
          error: (err) => {
            console.error("Erreur lors de la récupération des données en temps réel", err);
          }
        });
    }
  }

  // Fonction pour arrêter la mise à jour des données en temps réel
  stopRealTimeDataUpdate(): void {
    if (this.dataIntervalSubscription) {
      this.dataIntervalSubscription.unsubscribe();
      this.dataIntervalSubscription = null;
    }
  }
  // On récupère les dernières données du controlleur enregistrées
  // Fonction pour obtenir les dernières données disponibles
  getSolarDataLast(): void {
    this.solarDataService.getSolarDataLast().subscribe({
      next: (data) => {
        this.solarData$.next(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des dernières données", err);
      }
    });
  }

  ngOnDestroy(): void {
    // Nettoyage des abonnements
    if (this.serverStatusSubscription) {
      this.serverStatusSubscription.unsubscribe();
    }
    if (this.dataIntervalSubscription) {
      this.dataIntervalSubscription.unsubscribe();
    }
  }
}