import { Component, OnInit } from '@angular/core';
import { faArrowRight, faChartLine, faCheck, faMoon, faSun, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Controller } from '../../modeles/controller';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BehaviorSubject, combineLatest, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { Raspberry } from '../../modeles/server_infos';
import { DailyStatistics } from '../../modeles/dailyStatistics';
import { DailyStatisticsService } from '../../services/dailyStatistics/daily-statistics.service';
import { EnergyStatisticsService } from '../../services/energyStatistics/energy-statistics.service';
import { EnergyStatistics } from '../../modeles/energyStatistics';
import { ControllerDataService } from '../../services/controllerData/controller-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  isServerOnline: boolean = false;
  isLoading = true;
  
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  dailyStatistics$: BehaviorSubject<DailyStatistics | null> = new BehaviorSubject<DailyStatistics | null>(null);
  combinedData$!: Observable<{ controllerData: Controller | null; dailyStatistics: DailyStatistics | null }>;   // Observable combiné

  energyStatistics$: BehaviorSubject<EnergyStatistics | null> = new BehaviorSubject<EnergyStatistics | null>(null);

  systemInfo$: BehaviorSubject<Raspberry | null> = new BehaviorSubject<Raspberry | null>(null);

  

  faWarning = faWarning
  faArrowRight = faArrowRight
  faSun = faSun
  faMoon = faMoon
  faChart = faChartLine
  faCheck = faCheck


  constructor(
    private serveurService: ServeurService,
    private controllerDataService: ControllerDataService,
    private dailyStatisticsService: DailyStatisticsService,
    private energyStatisticsService: EnergyStatisticsService    
  ){}

  ngOnInit(): void {
    this.getLastControllerData();
    this.getDailyStatisticsLast();
    this.getEnergyStatisticsLast();

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
            this.getInfosServeur();
          } else {
            this.getLastControllerData();
            this.getDailyStatisticsLast();
            this.getEnergyStatisticsLast();
          }
        });
  }

  // Requêtes en temps réel avec une pause de 1 seconde entre elles
  fetchRealtimeData() {
    const realtimeRequests = [
      () => this.getControllerRealtime(),
      () => this.getDailyStatisticsRealtime(),
      () => this.getEnergyStatisticsRealtime()
    ];

    realtimeRequests.reduce((chain, request) => {
      return chain.pipe(
        concatMap(() => request()), // Exécuter chaque requête séquentiellement
        concatMap(() => timer(1000)) // Ajouter une pause de 1 seconde
      );
    }, timer(0)).subscribe();
  }
  
  getControllerRealtime(): Observable<Controller> {
    return this.controllerDataService.getControllerDataRealtime().pipe(
      map((data) => {
        this.controllerData$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }

  // On récupère les dernières données du controller enregistrées
  getLastControllerData() {
    this.controllerDataService.getControllerDataLast().subscribe({
      next: (data) => {
        this.controllerData$.next(data); // Mise à jour via BehaviorSubject
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


  getEnergyStatisticsRealtime(): Observable<EnergyStatistics> {
    return this.energyStatisticsService.getEnergyStatisticsRealtime().pipe(
      map((data) => {
        this.energyStatistics$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }

  // On récupère les dernières données du controller enregistrées
  getEnergyStatisticsLast() {
    this.energyStatisticsService.getEnergyStatisticsLast().subscribe({
      next: (data) => {
        this.energyStatistics$.next(data); // Mise à jour via BehaviorSubject
        this.isLoading = false;
      }
    });
  }
  //  On récupère les infos du serveur Kammthaar en temps réel
  getInfosServeur(){ 
    this.serveurService.getSystemInfo().subscribe({
      next: (data) => (this.systemInfo$.next(data))
    });
  }
}


