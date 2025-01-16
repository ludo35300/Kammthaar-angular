import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCarBattery, faChartArea, faSun } from '@fortawesome/free-solid-svg-icons';
import { BatteryStatus } from '../../../modeles/batteryStatus';

@Component({
  selector: 'app-batterie-pourcentage',
  templateUrl: './batterie-pourcentage.component.html',
  styleUrl: './batterie-pourcentage.component.scss'
})
export class BatteriePourcentageComponent {
  @Input() batteryStatus: BatteryStatus | null = null;
  @Output() labelSelected = new EventEmitter<string>();
  isLoading = true;

  currentCharge: number = 0; // Variable locale pour stocker le pourcentage actuel

  faCarBattery = faCarBattery; 
  faChart = faChartArea;
  faSun = faSun;

  ngOnChanges(){
    if(this.batteryStatus){
      this.currentCharge = this.batteryStatus.state_of_charge;
      this.isLoading = false;
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
