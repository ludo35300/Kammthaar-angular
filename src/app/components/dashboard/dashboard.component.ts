import { Component, OnInit } from '@angular/core';
import { faArrowRight, faChartLine, faCheck, faMoon, faSun, faWarning } from '@fortawesome/free-solid-svg-icons';
import { ControllerService } from '../../services/controller/controller.service';
import { Controller } from '../../modeles/controller';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Statistiques } from '../../modeles/statistiques';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  isServerOnline: boolean | null = null;
  isLoading = true;
  
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  statistiquesData: Statistiques | null = null;
  systemInfo: any;

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
    this.serveurService.checkServerStatus()
        .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
        .subscribe((status) => {
          this.isServerOnline = status;
    
          if (this.isServerOnline) {
            this.getControllerRealtime();
            this.controllerData$.subscribe((data) => {
              if (data) {
                // Pause de 1 seconde avant d'exécuter getStatistiquesRealtime
                setTimeout(() => {
                  this.getStatistiquesRealtime();
                }, 1000);
              }
            });
            this.getInfosServeur();
          } else {
            this.getLastControllerData();
            this.getLastStatistiques();
            
          }

        });
  }

  // Récupération des infos du controller en temps réel
  getControllerRealtime() {
    this.controllerService.getControllerRealtime().subscribe({
      next: (data) => {
        this.controllerData$.next(data); // Mise à jour via BehaviorSubject
        this.isLoading = false;
      }
    });
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
      next: (data) => (this.systemInfo = data)
    });
  }
   // Colonnes affichées dans le tableau
   displayedColumns: string[] = ['status', 'cpu_usage', 'memory_usage', 'disk_usage', 'temperature'];


   // On récupère les statistiques du MPPT en temps réel
  getStatistiquesRealtime(){
    this.dashboardService.getStatistiquesRealtimeData().subscribe({
      next: (data) => {
        this.statistiquesData = data;
      }
    });
  }

  // On récupère les dernières statistiques enregistrées
  getLastStatistiques(){
    this.dashboardService.getLastStatistiques().subscribe({
      next: (data) => {
        this.statistiquesData = data;
      }
    });
  }
}
