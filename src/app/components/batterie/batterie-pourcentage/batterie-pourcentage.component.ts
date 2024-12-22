import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCarBattery, faChartArea, faSun } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { BatterieRealtimeService } from '../../../services/batterie/batterie-realtime.service';
import { Batterie } from '../../../modeles/batterie';

@Component({
  selector: 'app-batterie-pourcentage',
  templateUrl: './batterie-pourcentage.component.html',
  styleUrl: './batterie-pourcentage.component.scss'
})
export class BatteriePourcentageComponent {
  @Input() isServerOnline!: boolean | null;
  @Output() labelSelected = new EventEmitter<string>();
  batterieData: Batterie | null = null;

  isLoading = true;

  currentCharge: number = 0; // Variable locale pour stocker le pourcentage actuel


  faCarBattery = faCarBattery; 
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
          this.currentCharge = data.battery_pourcent;
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
          this.currentCharge = data.battery_pourcent;
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
    if (this.currentCharge > 75) {
      return 'progress-good'; // Vert pour 75% ou plus
    } else if (this.currentCharge > 40) {
      return 'bg-warning'; // Orange pour 40%-75%
    } else {
      return 'progress-danger'; // Rouge pour moins de 40%
    }
  }

  // Méthode pour émettre un label sélectionné
  onViewGraph(label: string) {
    this.labelSelected.emit(label);
  }

}
