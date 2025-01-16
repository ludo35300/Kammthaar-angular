import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChartArea, faSun, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons';
import { BatteryStatus } from '../../../modeles/batteryStatus';

@Component({
  selector: 'app-batterie-temperature',
  templateUrl: './batterie-temperature.component.html',
  styleUrl: './batterie-temperature.component.scss'
})
export class BatterieTemperatureComponent {
  @Input() batteryStatus: BatteryStatus | null = null;
  @Output() labelSelected = new EventEmitter<string>();
  isLoading = true;

  batterieTemperature: number = 0; // Variable locale pour stocker le pourcentage actuel

  faTemperature = faTemperatureThreeQuarters;
  faChart = faChartArea;
  faSun = faSun;
  
  ngOnChanges(){
    if(this.batteryStatus){
      this.batterieTemperature = this.batteryStatus.temperature;
      this.isLoading = false;
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
