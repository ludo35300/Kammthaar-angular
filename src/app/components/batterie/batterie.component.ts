import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { faCarBattery, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { Controller } from '../../modeles/controller';
import { DailyStatistics } from '../../modeles/dailyStatistics';
import { DailyStatisticsService } from '../../services/dailyStatistics/daily-statistics.service';
import { BatteryStatusService } from '../../services/batteryStatus/battery-status.service';
import { BatteryStatus } from '../../modeles/batteryStatus';
import { ControllerDataService } from '../../services/controllerData/controller-data.service';


@Component({
  selector: 'app-batterie',
  templateUrl: './batterie.component.html',
  styleUrl: './batterie.component.scss'
})
export class BatterieComponent implements OnInit{
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  dailyStatistics$: BehaviorSubject<DailyStatistics | null> = new BehaviorSubject<DailyStatistics | null>(null);
  combinedData$!: Observable<{ controllerData: Controller | null; dailyStatistics: DailyStatistics | null }>;   // Observable combiné
  
  batteryStatus$: BehaviorSubject<BatteryStatus | null> = new BehaviorSubject<BatteryStatus | null>(null);

  isServerOnline: boolean = false;
  isLoading: boolean = true;

  faCarBattery = faCarBattery;
  faSun = faSun;
  selectedLabel: string  = "Pourcentage";

  constructor(
    private serveurService: ServeurService,
    private controllerDataService: ControllerDataService,
    private dailyStatisticsService: DailyStatisticsService,
    private batteryStatusService: BatteryStatusService
  ){}

  ngOnInit(): void {
    this.getLastControllerData();
    this.getDailyStatisticsLast();
    this.getBatterieStatusLast();

    // Initialisation de combinedData$
    this.combinedData$ = combineLatest([this.controllerData$, this.dailyStatistics$]).pipe(
      map(([controllerData, dailyStatistics]) => ({ controllerData, dailyStatistics }))
    );
    
    this.serveurService.getServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.fetchRealtimeData();
        }else {
            this.getLastControllerData();
            this.getDailyStatisticsLast();

            this.getBatterieStatusLast(); 
        }
      });
  }

  // Requêtes en temps réel avec une pause de 1 seconde entre elles
  fetchRealtimeData() {
    const realtimeRequests = [
      () => this.getControllerRealtime(),
      () => this.getDailyStatisticsRealtime(),

      () => this.getBatterieStatusRealtime(),
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
    return this.controllerDataService.getControllerDataRealtime().pipe(
      map((data) => {
        this.controllerData$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastControllerData(){
    this.controllerDataService.getControllerDataLast().subscribe({
      next: (data) => {
        this.controllerData$.next(data);
        this.isLoading = false;
      }
    });
  }
  getDailyStatisticsRealtime(): Observable<DailyStatistics> {
    return this.dailyStatisticsService.getDailyStatisticsRealtime().pipe(
      map((data) => {
        this.dailyStatistics$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }
  
  // On récupère les dernières données du controller enregistrées
  getDailyStatisticsLast() {
    this.dailyStatisticsService.getDailyStatisticsLast().subscribe({
      next: (data) => {
        this.dailyStatistics$.next(data); // Mise à jour via BehaviorSubject
        this.isLoading = false;
      }
    });
  }

  getBatterieStatusRealtime(): Observable<BatteryStatus> {
    return this.batteryStatusService.getBatteryStatusRealtime().pipe(
      map((data) => {
        this.batteryStatus$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }
  // On récupère les dernières données du controlleur enregistrées
  getBatterieStatusLast(){
    this.batteryStatusService.getBatteryStatusLast().subscribe({
      next: (data) => {
        this.batteryStatus$.next(data);
      },
    });
  }

  onLabelSelected(label: string) {
    this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
  }

}