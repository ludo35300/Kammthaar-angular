import { Component, OnInit } from '@angular/core';
import { faArrowRight, faChartLine, faCheck, faMoon, faSun, faWarning } from '@fortawesome/free-solid-svg-icons';
import { ControllerService } from '../../services/controller/controller.service';
import { Controller } from '../../modeles/controller';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BehaviorSubject, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Statistiques } from '../../modeles/statistiques';
import { Raspberry } from '../../modeles/server_infos';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  isServerOnline: boolean | null = null;
  isLoading = true;
  
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  statistiquesData$: BehaviorSubject<Statistiques | null> = new BehaviorSubject<Statistiques | null>(null);
  systemInfo$: BehaviorSubject<Raspberry | null> = new BehaviorSubject<Raspberry | null>(null);

  faWarning = faWarning
  faArrowRight = faArrowRight
  faSun = faSun
  faMoon = faMoon
  faChart = faChartLine
  faCheck = faCheck


  constructor(
    private serveurService: ServeurService,
    private controllerService: ControllerService,
    private dashboardService: DashboardService
    
  ){}

  ngOnInit(): void {
    this.getLastControllerData();
    this.getLastStatistiques();

    this.serveurService.getServerStatus()
        .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
        .subscribe((status) => {
          this.isServerOnline = status;
          if (this.isServerOnline) {
            this.fetchRealtimeData();
            this.getInfosServeur();
          } else {
            this.getLastControllerData();
            this.getLastStatistiques();
          }
        });
  }

  // Requêtes en temps réel avec une pause de 1 seconde entre elles
  fetchRealtimeData() {
    const realtimeRequests = [
      () => this.getControllerRealtime(),
      () => this.getStatistiquesRealtime(),
    ];

    realtimeRequests.reduce((chain, request) => {
      return chain.pipe(
        concatMap(() => request()), // Exécuter chaque requête séquentiellement
        concatMap(() => timer(1000)) // Ajouter une pause de 1 seconde
      );
    }, timer(0)).subscribe();
  }
  
  getControllerRealtime(): Observable<Controller> {
    return this.controllerService.getControllerRealtime().pipe(
      map((data) => {
        this.controllerData$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }

  // On récupère les dernières données du controller enregistrées
  getLastControllerData() {
    this.controllerService.getLastController().subscribe({
      next: (data) => {
        this.controllerData$.next(data); // Mise à jour via BehaviorSubject
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

  
  getStatistiquesRealtime(): Observable<Statistiques> {
    return this.dashboardService.getStatistiquesRealtimeData().pipe(
      map((data) => {
        this.statistiquesData$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastStatistiques(){
    this.dashboardService.getLastStatistiques().subscribe({
      next: (data) => {
        this.statistiquesData$.next(data);
        this.isLoading = false;
      }
    });
  }
}


