import { Component } from '@angular/core';
import { faArrowRight, faMoon, faSolarPanel, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { ControllerService } from '../../services/controller/controller.service';
import { Controller } from '../../modeles/controller';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { PsService } from '../../services/ps/ps.service';
import { Ps } from '../../modeles/ps';


@Component({
  selector: 'app-ps',
  templateUrl: './ps.component.html',
  styleUrl: './ps.component.scss'
})
export class PsComponent {
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  psData$: BehaviorSubject<Ps | null> = new BehaviorSubject<Ps | null>(null);

  isServerOnline: boolean | null = null;
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
    private controllerService: ControllerService,
    private psService: PsService
  ){}

  ngOnInit(): void {
    // on charge les données hors ligne pour eviter le temps d'attente
    this.getLastControllerData();
    this.getLastBatterieData(); 

    this.serveurService.checkServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.getControllerRealtime();
          this.controllerData$.subscribe((data) => {
            if (data) {
              setTimeout(() => {  // Pause de 1 seconde avant d'exécuter getStatistiquesRealtime
                this.getBatterieRealtime()
              }, 1000);
            }
          });
        }else {
            this.getLastControllerData();
            this.getLastBatterieData();  
        }
      });
  }

  // Récupération des infos du controller pour récupére la date
  getControllerRealtime(){
    this.controllerService.getControllerRealtime().subscribe({
      next: (data) => {
        this.controllerData$.next(data);
        this.isLoading = false;
      }
    });
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastControllerData(){
    this.controllerService.getLastController().subscribe({
      next: (data) => {
        this.controllerData$.next(data);
        this.isLoading = false;
      }
    });
  }
  // Récupération des infos de la batterie (date, jour/nuit) en temps réel
  getBatterieRealtime(){
    this.psService.getPsData().subscribe({
      next: (data) => {
        this.psData$.next(data);
      },
    });
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastBatterieData(){
    this.psService.getLastPsData().subscribe({
      next: (data) => {
        this.psData$.next(data);
      },
    });
  }
}