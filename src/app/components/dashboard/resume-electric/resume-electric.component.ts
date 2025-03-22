import { Component } from '@angular/core';
import { SolarDataService } from '../../../services/solarData/solar-data.service';
import { BehaviorSubject, forkJoin, interval, Subscription, switchMap, tap, timer } from 'rxjs';
import { SolarData } from '../../../modeles/solarData';
import { ServeurService } from '../../../services/serveur/serveur.service';
import { LoadData } from '../../../modeles/loadData';
import { BatteryStatus } from '../../../modeles/batteryStatus';
import { BatteryStatusService } from '../../../services/batteryStatus/battery-status.service';
import { LoadDataService } from '../../../services/loadData/load-data.service';
import { BreadcrumbService } from '../../../services/breadcrumb/breadcrumb.service';
import { Breadcrumb } from '../../../modeles/breadcrumb';
import { faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resume-electric',
  templateUrl: './resume-electric.component.html',
  styleUrl: './resume-electric.component.scss'
})
export class ResumeElectricComponent {
  solarData$: BehaviorSubject<SolarData | null> = new BehaviorSubject<SolarData | null>(null);
  loadData$: BehaviorSubject<LoadData | null> = new BehaviorSubject<LoadData | null>(null);
  batteryStatus$: BehaviorSubject<BatteryStatus | null> = new BehaviorSubject<BatteryStatus | null>(null);
  breadcrumbData$: BehaviorSubject<Breadcrumb | null> = new BehaviorSubject<Breadcrumb | null>(null);
  
  private dataIntervalSubscription: Subscription | null = null;

  private serverStatusSubscription: Subscription | null = null;
  isServerOnline: boolean = false;

  isLoadingPv: boolean = true;
  isLoadingDay: boolean = true;
  isLoadingConsommation: boolean = true;
  isLoadingBatterie: boolean = true;

  faSun = faSun;
  


  constructor( 
    private serveurService: ServeurService, 
    private solarDataService: SolarDataService, 
    private batteryStatusService: BatteryStatusService,
    private loadDataService: LoadDataService,
    private breadcrumbService: BreadcrumbService
  ){}

  ngOnInit(){
    this.getSolarDataLast();
    this.getLoadDataLast();
    this.getBatterieStatusLast();
    this.getBreadcrumbLast();


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
      loadData: this.loadDataService.getLoadDataRealtime(),
      breadcrumbData: this.breadcrumbService.getBreadcrumbRealtime()
    }).pipe(
      tap(({ solarData, batteryData, loadData }) => {
        this.solarData$.next(solarData);
        this.batteryStatus$.next(batteryData);
        this.loadData$.next(loadData);
        this.isLoadingPv = false;
        this.isLoadingConsommation = false;
        this.isLoadingBatterie = false;
        this.isLoadingDay = false;
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
        this.isLoadingPv = false;
      }
    });
  }
  getLoadDataLast() {
    this.loadDataService.getLoadDataLast().subscribe({
      next: (data) => {
        this.loadData$.next(data); // Mise à jour via BehaviorSubject
        this.isLoadingConsommation = false;
      }
    });
  }
  // On récupère les dernières données du controlleur enregistrées
  getBatterieStatusLast(){
    this.batteryStatusService.getBatteryStatusLast().subscribe({
      next: (data) => {
        this.batteryStatus$.next(data);
        this.isLoadingBatterie = false;
      }
    });
  }
  // On récupère les dernières données du breadcrumb enregistrées
  getBreadcrumbLast(){
    this.breadcrumbService.getBreadcrumbLast().subscribe({
      next: (data) => {
        this.breadcrumbData$.next(data);
        this.isLoadingDay = false;
      }
    });
  }

}
