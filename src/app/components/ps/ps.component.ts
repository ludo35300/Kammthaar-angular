import { Component } from '@angular/core';
import { faArrowRight, faMoon, faSolarPanel, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { Controller } from '../../modeles/controller';
import { BehaviorSubject, combineLatest, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { DailyStatistics } from '../../modeles/dailyStatistics';
import { DailyStatisticsService } from '../../services/dailyStatistics/daily-statistics.service';
import { SolarDataService } from '../../services/solarData/solar-data.service';
import { SolarData } from '../../modeles/solarData';
import { ControllerDataService } from '../../services/controllerData/controller-data.service';


@Component({
  selector: 'app-ps',
  templateUrl: './ps.component.html',
  styleUrl: './ps.component.scss'
})
export class PsComponent {
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  dailyStatistics$: BehaviorSubject<DailyStatistics | null> = new BehaviorSubject<DailyStatistics | null>(null);
  combinedData$!: Observable<{ controllerData: Controller | null; dailyStatistics: DailyStatistics | null }>;   // Observable combiné

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
    private controllerDataService: ControllerDataService,
    private dailyStatisticsService: DailyStatisticsService,
    private solarDataService: SolarDataService
  ){}

  ngOnInit(): void {
    // on charge les données hors ligne pour eviter le temps d'attente
    this.getLastControllerData();
    this.getDailyStatisticsLast();
    this.getSolarDataLast(); 

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
            this.getDailyStatisticsLast();
            this.getSolarDataLast();  
        }
      });
  }
  // Requêtes en temps réel avec une pause de 1 seconde entre elles
    fetchRealtimeData() {
      const realtimeRequests = [
        () => this.getControllerRealtime(),
        () => this.getDailyStatisticsRealtime(),
        () => this.getSolarDataRealtime()
      ];
    
      realtimeRequests.reduce((chain, request) => {
        return chain.pipe(
          concatMap(() => request()), // Exécuter chaque requête séquentiellement
          concatMap(() => timer(1000)) // Ajouter une pause de 1 seconde
        );
      }, timer(0)).subscribe();
    }

// Récupération des infos pour le breadcrumb
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