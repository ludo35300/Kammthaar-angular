import { Component } from '@angular/core';
import { Controller } from '../../modeles/controller';
import { ControllerService } from '../../services/controller/controller.service';
import { faSun, faMoon, faDumpster, faArrowRight  } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';


@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.scss'
})
export class ControllerComponent {
  isServerOnline: boolean | null = null;
  isLoading = true;

  controllerData: Controller | null = null;
  lastControllerData: Controller | null = null;

  faSun = faSun 
  faMoon = faMoon
  faDumpster = faDumpster
  faArrowRight = faArrowRight

  constructor(
    private controllerService: ControllerService,
    private serveurService: ServeurService
  ) {}

  ngOnInit(): void {
    // Vérificaton si Kammthaar est en ligne
    this.serveurService.serverStatus$.subscribe((status) => {
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
        this.lastControllerData = null;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données du controlleur MPPT:', error);
        this.isLoading = false;
      },
    });
  }

  // On récupère les dernières données du controlleur enregistrées
  getLastControllerData(){
    this.controllerService.getLastController().subscribe({
      next: (data) => {
        this.lastControllerData = data;
        this.isLoading = false;
        this.controllerData = null;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des dernières données du controlleur MPPT:', error);
        this.isLoading = false;
      },
    });
  }
}