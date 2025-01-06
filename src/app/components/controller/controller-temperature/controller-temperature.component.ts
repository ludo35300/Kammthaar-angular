import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTemperatureThreeQuarters, faChartArea, faSun } from '@fortawesome/free-solid-svg-icons';
import { Controller } from '../../../modeles/controller';
import { ControllerService } from '../../../services/controller/controller.service';


@Component({
  selector: 'app-controller-temperature',
  templateUrl: './controller-temperature.component.html',
  styleUrl: './controller-temperature.component.scss'
})
export class ControllerTemperatureComponent {
  @Output() labelSelected = new EventEmitter<string>();
  @Input() controllerData: Controller | null = null;
  isLoading = true;
  
  controllerTemperature: number = 0; // Variable locale pour stocker le pourcentage actuel
  
  faTemperature = faTemperatureThreeQuarters;
  faChart = faChartArea;
  faSun = faSun;
    
  ngOnChanges(){
    // Si Kammthaar est en ligne on récupère les informations en temps réel
    if(this.controllerData){
        this.controllerTemperature = this.controllerData.controller_temperature;
        this.isLoading = false;
    }
  }
  
  
  getProgressBarClass(): string {
    if (this.controllerTemperature >= 2 && this.controllerTemperature <= 40) {
      return 'progress-good'; // Vert ENTRE 2 ET 30°C
    } else if (this.controllerTemperature < 2) {
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
  
