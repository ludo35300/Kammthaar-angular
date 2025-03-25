import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, interval, Subscription, switchMap } from 'rxjs';
import { faCarBattery, faCheck, faSun, faWarning } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BatteryStatusService } from '../../services/batteryStatus/battery-status.service';
import { BatteryStatus } from '../../modeles/batteryStatus';


@Component({
  selector: 'app-batterie',
  templateUrl: './batterie.component.html',
  styleUrl: './batterie.component.scss'
})
export class BatterieComponent implements OnInit{
  // Icones FontAwesome
  faCarBattery = faCarBattery;
  faSun = faSun;
  faWarning = faWarning;
  faCheck = faCheck;
  // Etat du chargement de la page 
  isLoading: boolean = true;
  // Titre transmis au graphique qui, par défault charge le graphique de pourcentage
  titreGraphique: string  = "Pourcentage";

  private serverStatusSubscription: Subscription | null = null;
  isServerOnline: boolean = false;

  erreurMessageServeur: string | null = null;
  private errorSubscription!: Subscription;

  erreurMessageData: string | null = null;

  batteryStatus$: BehaviorSubject<BatteryStatus | null> = new BehaviorSubject<BatteryStatus | null>(null);
  private dataIntervalSubscription: Subscription | null = null;
  
  constructor(
    private serveurService: ServeurService,
    private batteryStatusService: BatteryStatusService
  ){}

  ngOnInit(): void {
    this.getBatterieStatusLast(); // On charge les données hors ligne pour éviter le temps d'attente

    this.serverStatusSubscription = this.serveurService.serverStatus$.subscribe(status => {
      this.isServerOnline = status;
      if (this.isServerOnline) {
        this.startRealTimeDataUpdate();
      } else {
        this.getBatterieStatusLast();
        this.stopRealTimeDataUpdate();
      }
    });
    
  }

  // Fonction pour obtenir les données en temps réel et les mettre à jour toutes les 10 secondes
  startRealTimeDataUpdate(): void {
    if (!this.dataIntervalSubscription) {
      this.dataIntervalSubscription = interval(10000) // Chaque 10 secondes
        .pipe(
          switchMap(() => this.serveurService.checkServerStatus()), // Vérifie le Raspberry
          filter((isOnline) => isOnline),
          switchMap(() => this.batteryStatusService.getBatteryStatusRealtime()) // Récupère les données en temps réel
        )
        .subscribe({
          next: (data) => {
            this.batteryStatus$.next(data); // Mettre à jour via BehaviorSubject
          },
          error: (err) => {
            this.erreurMessageData = `Erreur lors de la récupération des données de la batterie:, ${err}`
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
  getBatterieStatusLast(){
    this.batteryStatusService.getBatteryStatusLast().subscribe({
      next: (data) => {
        this.batteryStatus$.next(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.erreurMessageData = `Erreur lors de la récupération des dernières données enregistrées de la batterie: ${err}`;
        this.isLoading = false;
      }
    });
  }

  titreSelected(titre: string) {
    this.titreGraphique = titre; // Mettre à jour le titre pour transmettre au graphique
  }
  
  ngOnDestroy(): void {
    this.serverStatusSubscription?.unsubscribe();
    this.dataIntervalSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }
}