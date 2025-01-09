import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { faCarBattery, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { ControllerService } from '../../services/controller/controller.service';
import { Controller } from '../../modeles/controller';
import { Batterie } from '../../modeles/batterie';
import { BatterieService } from '../../services/batterie/batterie.service';


@Component({
  selector: 'app-batterie',
  templateUrl: './batterie.component.html',
  styleUrl: './batterie.component.scss'
})
export class BatterieComponent implements OnInit{
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  batterieData$: BehaviorSubject<Batterie | null> = new BehaviorSubject<Batterie | null>(null);

  isServerOnline: boolean = false;
  isLoading: boolean = true;

  

  faCarBattery = faCarBattery;
  faSun = faSun;
  selectedLabel: string  = "Pourcentage";

  onLabelSelected(label: string) {
    this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
  }

  constructor(
    private serveurService: ServeurService,
    private controllerService: ControllerService,
    private batterieService: BatterieService
  ){}

  ngOnInit(): void {
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
        }
        // }else {
        //     this.getLastControllerData();
        //     this.getLastBatterieData();  
        // }
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
    this.batterieService.getBatterieData().subscribe({
      next: (data) => {
        this.batterieData$.next(data);
      },
    });
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastBatterieData(){
    this.batterieService.getLastBatterieData().subscribe({
      next: (data) => {
        this.batterieData$.next(data);
      },
    });
  }
}