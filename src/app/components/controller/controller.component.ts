import { Component } from '@angular/core';
import { Controller } from '../../modeles/controller';
import { faSun, faMoon, faDumpster, faArrowRight  } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BehaviorSubject, combineLatest, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { DailyStatistics } from '../../modeles/dailyStatistics';
import { DailyStatisticsService } from '../../services/dailyStatistics/daily-statistics.service';
import { ControllerDataService } from '../../services/controllerData/controller-data.service';
import { ChargingEquipmentStatus } from '../../modeles/chargingEquipmentStatus';
import { ChargingEquipmentStatusService } from '../../services/chargingEquipmentStatus/charging-equipment-status.service';
import { DischargingEquipmentStatusService } from '../../services/dischargingEquipmentStatus/discharging-equipment-status.service';
import { DischargingEquipmentStatus } from '../../modeles/dischargingEquipmentStatus';


@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.scss'
})
export class ControllerComponent {
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  dailyStatistics$: BehaviorSubject<DailyStatistics | null> = new BehaviorSubject<DailyStatistics | null>(null);
  combinedData$!: Observable<{ controllerData: Controller | null; dailyStatistics: DailyStatistics | null }>;   // Observable combiné
  chargingEquipmentStatus$: BehaviorSubject<ChargingEquipmentStatus | null> = new BehaviorSubject<ChargingEquipmentStatus | null>(null);
  dischargingEquipmentStatus$: BehaviorSubject<DischargingEquipmentStatus | null> = new BehaviorSubject<DischargingEquipmentStatus | null>(null);

  isServerOnline: boolean = false;
  selectedLabel: string | null = "Puissance";

  isLoading = true;

  faSun = faSun 
  faMoon = faMoon
  faDumpster = faDumpster
  faArrowRight = faArrowRight
  
  constructor(
    private serveurService: ServeurService,
    private controllerDataService: ControllerDataService,
    private dailyStatisticsService: DailyStatisticsService,
    private chargingEquipmentStatusService: ChargingEquipmentStatusService,
    private dischargingEquipmentStatusService: DischargingEquipmentStatusService
  ){}
  
  ngOnInit(): void {
      this.getLastControllerData();
      this.getDailyStatisticsLast();
      this.getChargingEquipmentStatusLast();
      this.getDischargingEquipmentStatusLast();
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
              this.getChargingEquipmentStatusLast();
              this.getDischargingEquipmentStatusLast();
          }
        });
    }
  
    // Requêtes en temps réel avec une pause de 1 seconde entre elles
    fetchRealtimeData() {
      const realtimeRequests = [
        () => this.getControllerRealtime(),
        () => this.getDailyStatisticsRealtime(),
        () => this.getChargingEquipmentStatusRealtime(),
        () => this.getDischargingEquipmentStatusRealtime(),
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
    getChargingEquipmentStatusRealtime(): Observable<ChargingEquipmentStatus> {
      return this.chargingEquipmentStatusService.getRealtime().pipe(
        map((data) => {
          this.chargingEquipmentStatus$.next(data); // Mettre à jour via BehaviorSubject
          this.isLoading = false;
          return data;
        })
      );
    }
    
    // On récupère les dernières données du controller enregistrées
    getChargingEquipmentStatusLast() {
      this.chargingEquipmentStatusService.getLast().subscribe({
        next: (data) => {
          this.chargingEquipmentStatus$.next(data); // Mise à jour via BehaviorSubject
          this.isLoading = false;
        }
      });
    }
    getDischargingEquipmentStatusRealtime(): Observable<DischargingEquipmentStatus> {
      return this.dischargingEquipmentStatusService.getRealtime().pipe(
        map((data) => {
          this.dischargingEquipmentStatus$.next(data); // Mettre à jour via BehaviorSubject
          this.isLoading = false;
          return data;
        })
      );
    }
    
    // On récupère les dernières données du controller enregistrées
    getDischargingEquipmentStatusLast() {
      this.dischargingEquipmentStatusService.getLast().subscribe({
        next: (data) => {
          this.dischargingEquipmentStatus$.next(data); // Mise à jour via BehaviorSubject
          this.isLoading = false;
        }
      });
    }

  onLabelSelected(label: string) {
    this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
  }
    
}