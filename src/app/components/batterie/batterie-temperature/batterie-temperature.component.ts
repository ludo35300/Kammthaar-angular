import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCarBattery, faChartArea, faSun, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons';
import { Batterie } from '../../../modeles/batterie';
import { BatterieRealtimeService } from '../../../services/batterie/batterie-realtime.service';

@Component({
  selector: 'app-batterie-temperature',
  templateUrl: './batterie-temperature.component.html',
  styleUrl: './batterie-temperature.component.scss'
})
export class BatterieTemperatureComponent {
  @Input() isServerOnline!: boolean | null;
  @Output() labelSelected = new EventEmitter<string>();
  batterieData: Batterie | null = null;
  

  isLoading = true;

  batterieTemperature: number = 0; // Variable locale pour stocker le pourcentage actuel

  faTemperature = faTemperatureThreeQuarters;
  faChart = faChartArea;
  faSun = faSun;

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
          this.batterieTemperature = data.battery_temp;
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
          this.batterieTemperature = data.battery_temp;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des données de statistiques:', error);
          this.isLoading = false;
        },
      });
    }
  }


  getProgressBarClass(): string {
    if (this.batterieTemperature >= 2 && this.batterieTemperature <= 30) {
      return 'progress-good'; // Vert ENTRE 2 ET 30°C
    } else if (this.batterieTemperature < 2) {
      return 'bg-primary'; // bleu si moins de 2°c
    } else{
      return 'progress-danger'; // Rouge pour plus de 30°c
    }
  }

  // Méthode pour émettre un label sélectionné
  onViewGraph(label: string) {
    this.labelSelected.emit(label);
  }
}
