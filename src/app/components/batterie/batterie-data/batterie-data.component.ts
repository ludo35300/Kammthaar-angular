import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Batterie } from '../../../modeles/batterie';
import { BatterieRealtimeService } from '../../../services/batterie/batterie-realtime.service';
import { faArrowRight, faCarBattery, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../../services/serveur/serveur.service';

@Component({
  selector: 'app-batterie-data',
  templateUrl: './batterie-data.component.html',
  styleUrl: './batterie-data.component.scss'
})
export class BatterieDataComponent {
  @Input() isServerOnline!: boolean | null;
  @Output() labelSelected = new EventEmitter<string>();
  isLoading = true;

  batterieData: Batterie | null = null;
  lastBatterieData: Batterie | null = null;

  faCarBattery = faCarBattery
  faArrowRight = faArrowRight
  faSun = faSun
  
  // Configuration des jauges
  gauges = [
    { label: 'Voltage', value: 0, unit: 'V', max: 55 },
    { label: 'Ampérage', value: 0, unit: 'A', max: 30 },
    { label: 'Puissance', value: 0, unit: 'W', max: 500 },
    { label: 'Pourcentage', value: 0, unit: '%', max: 100 },
    { label: 'Température', value: 0, unit: '°C', max: 50 }
  ];

  constructor(
    private batterieService: BatterieRealtimeService
  ){}

  ngOnInit(){
      // Si Kammthaar est en ligne on récupère les informations en temps réel
      if(this.isServerOnline){
        this.getBatterieRealtime();
      // Sinon on récupère la derniere entrée enregistrée dans InfluxDB
      }else{
        this.getLastBatterieData();
      }
  }

    

  // Récupération des infos de la batterie (date, jour/nuit) en temps réel
  getBatterieRealtime(){
    if(this.isServerOnline){
      this.batterieService.getBatterieData().subscribe({
        next: (data) => {
          this.batterieData = data;
          this.updateGauges(data);
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
          this.updateGauges(data);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données de statistiques:', error);
          this.isLoading = false;
        },
      });
    }
  }


  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: Batterie): void {
    if (!data) return;

    this.gauges = [
      { label: 'Voltage', value: data.battery_voltage || 0, unit: 'V', max: 50 },
      { label: 'Ampérage', value: data.battery_amperage || 0, unit: 'A', max: 30 },
      { label: 'Puissance', value: data.battery_power || 0, unit: 'W', max: 400 },
      { label: 'Pourcentage', value: data.battery_pourcent || 0, unit: '%', max: 100 },
      { label: 'Température', value: data.battery_temp || 0, unit: '°C', max: 50 }
    ];
  }

  // Méthode pour émettre un label sélectionné
  onViewGraph(label: string) {
    this.labelSelected.emit(label);
  }
}

