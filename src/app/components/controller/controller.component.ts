import { Component } from '@angular/core';
import { Controller } from '../../modeles/controller';
import { ControllerService } from '../../services/controller/controller.service';
import { faSun, faMoon, faDumpster, faArrowRight  } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.scss'
})
export class ControllerComponent {
  isServerOnline: boolean | null = null;
  selectedLabel: string | null = "Puissance";
  controllerData: Controller | null = null;

  isLoading = true;

  faSun = faSun 
  faMoon = faMoon
  faDumpster = faDumpster
  faArrowRight = faArrowRight

  

  onLabelSelected(label: string) {
      this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
    }
  
    constructor(
      private serveurService: ServeurService,
      private controllerService: ControllerService
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
  }