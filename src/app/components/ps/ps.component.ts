import { Component } from '@angular/core';
import { faArrowRight, faMoon, faSolarPanel, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { ControllerService } from '../../services/controller/controller.service';
import { Controller } from '../../modeles/controller';
import { distinctUntilChanged } from 'rxjs';
import { PsService } from '../../services/ps/ps.service';
import { Ps } from '../../modeles/ps';


@Component({
  selector: 'app-ps',
  templateUrl: './ps.component.html',
  styleUrl: './ps.component.scss'
})
export class PsComponent {
  isServerOnline: boolean | null = null;
  selectedLabel: string  = "Voltage";
  isLoading = true;

  controllerData: Controller | null = null;
  psData: Ps | null = null
  
  faSolarPanel = faSolarPanel
  faSun = faSun
  faMoon = faMoon
  faArrowRight = faArrowRight


  onLabelSelected(label: string) {
    this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
  }

  constructor(
    private serveurService: ServeurService,
    private controllerService: ControllerService,
    private psService: PsService
  ){}

  ngOnInit(): void {
    this.serveurService.checkServerStatus()
    .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
    .subscribe((status) => {
      this.isServerOnline = status;
      if (this.isServerOnline) {
        this.getControllerRealtime();
        setTimeout(() => {
          this.getPsRealtime();
        }, 1000);
        
      } else {
        this.getLastControllerData();
        this.getLastPsData();
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
        error: () => {
          this.isLoading = false;
        },
      });
  }

  getPsRealtime(){
    // On récupere les données en temps réel du panneau solaire (Voltage, Ampérage & Power)
    if(this.isServerOnline){
      this.psService.getPsData().subscribe({
        next: (data) => {
          this.psData = data;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données du PS:', error);
          this.isLoading = false;
        },
      });
    }
  }

  // On récupère les dernières statistiques enregistrées
  getLastPsData(){
    this.psService.getLastPsData().subscribe({
      next: (data) => {
        this.psData = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données de statistiques:', error);
        this.isLoading = false;
      },
    });
  }
}