import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, interval, Subscription, switchMap } from 'rxjs';
import { faCarBattery, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BatteryStatusService } from '../../services/batteryStatus/battery-status.service';
import { BatteryStatus } from '../../modeles/batteryStatus';


@Component({
  selector: 'app-batterie',
  templateUrl: './batterie.component.html',
  styleUrl: './batterie.component.scss'
})
export class BatterieComponent implements OnInit{
  batteryStatus$: BehaviorSubject<BatteryStatus | null> = new BehaviorSubject<BatteryStatus | null>(null);
  private serverStatusSubscription: Subscription | null = null;
  private dataIntervalSubscription: Subscription | null = null;
  isServerOnline: boolean = false;
  isLoading: boolean = true;

  faCarBattery = faCarBattery;
  faSun = faSun;
  selectedLabel: string  = "Pourcentage";

  constructor(
    private serveurService: ServeurService,
    private batteryStatusService: BatteryStatusService
  ){}

  ngOnInit(): void {
    this.getBatterieStatusLast();

    
    this.serveurService.getServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.startRealTimeDataUpdate();
        }else {
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
            switchMap(() => this.batteryStatusService.getBatteryStatusRealtime()) // Récupère les données en temps réel
          )
          .subscribe({
            next: (data) => {
              this.batteryStatus$.next(data); // Mettre à jour via BehaviorSubject
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
  getBatterieStatusLast(){
    this.batteryStatusService.getBatteryStatusLast().subscribe({
      next: (data) => {
        this.batteryStatus$.next(data);
        this.isLoading = false;
      },
    });
  }

  onLabelSelected(label: string) {
    this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
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