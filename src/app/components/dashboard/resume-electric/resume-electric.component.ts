import { Component } from '@angular/core';
import { SolarDataService } from '../../../services/solarData/solar-data.service';
import { BehaviorSubject, concatMap, forkJoin, interval, Subscription, switchMap, tap, timer } from 'rxjs';
import { SolarData } from '../../../modeles/solarData';
import { ServeurService } from '../../../services/serveur/serveur.service';
import { LoadData } from '../../../modeles/loadData';
import { BatteryStatus } from '../../../modeles/batteryStatus';
import { BatteryStatusService } from '../../../services/batteryStatus/battery-status.service';
import { LoadDataService } from '../../../services/loadData/load-data.service';

@Component({
  selector: 'app-resume-electric',
  templateUrl: './resume-electric.component.html',
  styleUrl: './resume-electric.component.scss'
})
export class ResumeElectricComponent {
  solarData$: BehaviorSubject<SolarData | null> = new BehaviorSubject<SolarData | null>(null);
  loadData$: BehaviorSubject<LoadData | null> = new BehaviorSubject<LoadData | null>(null);
  batteryStatus$: BehaviorSubject<BatteryStatus | null> = new BehaviorSubject<BatteryStatus | null>(null);
  
  private dataIntervalSubscription: Subscription | null = null;

  private serverStatusSubscription: Subscription | null = null;
  isServerOnline: boolean = false;

  isLoading: boolean = true;
  


  constructor( 
    private serveurService: ServeurService, 
    private solarDataService: SolarDataService, 
    private batteryStatusService: BatteryStatusService,
    private loadDataService: LoadDataService
  ){}

  ngOnInit(){
    this.getSolarDataLast();
    this.getLoadDataLast();
    this.getBatterieStatusLast();


    this.serverStatusSubscription = this.serveurService.serverStatus$.subscribe(status => {
      this.isServerOnline = status;
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.startRealTimeDataUpdate();
        }else {
            this.stopRealTimeDataUpdate();
        }
      });
  
    
  }

  startRealTimeDataUpdate(): void {
    if (!this.dataIntervalSubscription) {
      this.dataIntervalSubscription = interval(5000)
        .pipe(switchMap(() => this.fetchRealtimeData()))
        .subscribe({
          error: (err) => console.error("Erreur lors de la récupération des données en temps réel", err)
        });
    }
  }
  fetchRealtimeData() {
    return forkJoin({
      solarData: this.solarDataService.getSolarDataRealtime(),
      batteryData: this.batteryStatusService.getBatteryStatusRealtime(),
      loadData: this.loadDataService.getLoadDataRealtime()
    }).pipe(
      tap(({ solarData, batteryData, loadData }) => {
        this.solarData$.next(solarData);
        this.batteryStatus$.next(batteryData);
        this.loadData$.next(loadData);
      })
    );
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
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des dernières données", err);
      }
    });
  }
  getLoadDataLast() {
    this.loadDataService.getLoadDataLast().subscribe({
      next: (data) => {
        this.loadData$.next(data); // Mise à jour via BehaviorSubject
        this.isLoading = false;
      }
    });
  }
  // On récupère les dernières données du controlleur enregistrées
  getBatterieStatusLast(){
    this.batteryStatusService.getBatteryStatusLast().subscribe({
      next: (data) => {
        this.batteryStatus$.next(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

}
