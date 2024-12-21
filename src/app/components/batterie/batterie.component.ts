import { Component, OnInit } from '@angular/core';
import { faCarBattery, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { ControllerService } from '../../services/controller/controller.service';
import { Controller } from '../../modeles/controller';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { BatterieRealtimeService } from '../../services/batterie/batterie-realtime.service';
import { Batterie } from '../../modeles/batterie';


@Component({
  selector: 'app-batterie',
  templateUrl: './batterie.component.html',
  styleUrl: './batterie.component.scss'
})
export class BatterieComponent implements OnInit{
  isServerOnline: boolean | null = null;
  isLoading: boolean = true;
  batteryCharge: number = 0;

  controllerData: Controller | null = null;
  batterieData: Batterie | null = null;


  private batteriePourcentage = new BehaviorSubject<number | null>(0); // État initial
   // Observable pour écouter l'état
   batteriePourcentage$ = this.batteriePourcentage.asObservable();

  faCarBattery = faCarBattery;
  faSun = faSun;
  selectedLabel: string | null = null;

  onLabelSelected(label: string) {
    this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
  }

  constructor(
    private serveurService: ServeurService,
    private controllerService: ControllerService,
    private batterieService: BatterieRealtimeService
  ){}

  ngOnInit(): void {
    this.serveurService.checkServerStatus()
    .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
    .subscribe((status) => {
      this.isServerOnline = status;

      if (this.isServerOnline) {
        this.getControllerRealtime();
        this.getBatterieRealtime();
      } else {
        this.getLastControllerData();
        this.getLastBatterieData();
        
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
  // Récupération des infos de la batterie (date, jour/nuit) en temps réel
  getBatterieRealtime(){
    if(this.isServerOnline){
      this.batterieService.getBatterieData().subscribe({
        next: (data) => {
          this.batterieData = data;
          this.batteriePourcentage.next(this.batterieData.battery_pourcent);
          
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données la batterie:', error);
          this.isLoading = false;
        },
      });
    }
  }
  
  // On récupère les dernières données du controlleur enregistrées
  getLastBatterieData(){
    if(!this.isServerOnline){
      this.batterieService.getLastBatterieData().subscribe({
        next: (data) => {
          this.batterieData = data;
          this.batteriePourcentage.next(this.batterieData.battery_pourcent);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données de statistiques:', error);
          this.isLoading = false;
        },
      });
    }
  }
}