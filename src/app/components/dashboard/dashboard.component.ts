import { Component, OnInit } from '@angular/core';
import { faArrowRight, faChartLine, faCheck, faMoon, faSun, faWarning } from '@fortawesome/free-solid-svg-icons';
import { ControllerService } from '../../services/controller/controller.service';
import { Controller } from '../../modeles/controller';
import { ServeurService } from '../../services/serveur/serveur.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  isServerOnline: boolean | null = null;
  isLoading = true;

  controllerData: Controller | null = null;
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
    
  ){}

  ngOnInit(): void {
    this.serveurService.checkServerStatus()
        .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
        .subscribe((status) => {
          this.isServerOnline = status;
    
          if (this.isServerOnline) {
            this.getControllerRealtime();
          } else {
            this.getLastControllerData();
          }
        });
  }

  // Récupération des infos du controller pour récupére la date
  getControllerRealtime(){
    this.controllerService.getControllerRealtime().subscribe({
      next: (data) => {
        this.controllerData = data;
        this.isLoading = false;
      },
      error: (error) => {
        //console.error('Erreur lors de la récupération des données du controlleur MPPT:', error);
        this.isLoading = false;
      },
    });
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastControllerData(){
    this.controllerService.getLastController().subscribe({
      next: (data) => {
        this.controllerData = data;
        this.isLoading = false;
      },
      error: (error) => {
        //console.error('Erreur lors de la récupération des dernières données du controlleur MPPT:', error);
        this.isLoading = false;
      },
    });
  }
  //  On récupère les infos du serveur Kammthaar en temps réel
  getInfosServeur(){ 
    this.serveurService.getSystemInfo().subscribe({
      next: (data) => (this.systemInfo = data),
      error: (err) => console.error('Erreur lors de la récupération des données système:', err),
    });
  }
}
