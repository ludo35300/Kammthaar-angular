import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { ServeurService } from '../../services/serveur/serveur.service';
import { Controller } from '../../modeles/controller';
import { BatterieParametres } from '../../modeles/batteryParameters';
import { BatterieParametresService } from '../../services/batterie-parametres/batterie-parametres.service';
import { ControllerDataService } from '../../services/controllerData/controller-data.service';
import { DailyStatistics } from '../../modeles/dailyStatistics';
import { DailyStatisticsService } from '../../services/dailyStatistics/daily-statistics.service';

@Component({
  selector: 'app-batterie-parametres',
  templateUrl: './batterie-parametres.component.html',
  styleUrl: './batterie-parametres.component.scss'
})
export class BatterieParametresComponent {
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  dailyStatistics$: BehaviorSubject<DailyStatistics | null> = new BehaviorSubject<DailyStatistics | null>(null);
  combinedData$!: Observable<{ controllerData: Controller | null; dailyStatistics: DailyStatistics | null }>;   // Observable combiné
  batterieParametresData$: BehaviorSubject<BatterieParametres | null> = new BehaviorSubject<BatterieParametres | null>(null);

  isServerOnline: boolean = false;
  isLoading: boolean = true;

  controllerData: Controller | null = null;

  constructor(
      private serveurService: ServeurService,
      private controllerDataService: ControllerDataService,
      private dailyStatisticsService: DailyStatisticsService,
      private batterieParametresService: BatterieParametresService
  ){}

  ngOnInit(): void {
    this.getLastControllerData();
    this.getLastBatterieParametresData();
    this.getDailyStatisticsLast();
    // Initialisation de combinedData$
    this.combinedData$ = combineLatest([this.controllerData$, this.dailyStatistics$]).pipe(
      map(([controllerData, dailyStatistics]) => ({ controllerData, dailyStatistics }))
    );
      
    this.serveurService.checkServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.fetchRealtimeData();
        }else {
            this.getLastControllerData();
            this.getLastBatterieParametresData();
            this.getDailyStatisticsLast();
        }
      });
  }
  // Requêtes en temps réel avec une pause de 1 seconde entre elles
  fetchRealtimeData() {
    const realtimeRequests = [
      () => this.getControllerRealtime(),
      () => this.getDailyStatisticsRealtime(),
      () => this.getBatterieParametresRealtime()
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
  
  getBatterieParametresRealtime(): Observable<BatterieParametres> {
    return this.batterieParametresService.getBatterieParametresData().pipe(
      map((data) => {
        this.batterieParametresData$.next(data); // Mettre à jour via BehaviorSubject
        return data;
      })
    );
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastBatterieParametresData(){
    this.batterieParametresService.getLastBatterieParametresData().subscribe({
      next: (data) => {
        this.batterieParametresData$.next(data);
      },
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

}
