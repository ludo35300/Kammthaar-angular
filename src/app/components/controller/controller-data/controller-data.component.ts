import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Controller, GaugesController } from '../../../modeles/controller';
import { ControllerService } from '../../../services/controller/controller.service';
import { faBolt, faChartArea, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-controller-data',
  templateUrl: './controller-data.component.html',
  styleUrl: './controller-data.component.scss'
})

export class ControllerDataComponent {
  @Output() labelSelected = new EventEmitter<string>();
  isLoading = true;

  @Input()controllerData: Controller | null = null;

  faSun = faSun;
  faChart = faChartArea;
  faBolt = faBolt;

  // Initialisation des gauges
  gauges: GaugesController[] = [
    { label: 'Voltage', value: 0, unit: 'V', max: 55 },
    { label: 'Ampérage', value: 0, unit: 'A', max: 30 },
    { label: 'Puissance', value: 0, unit: 'W', max: 500 }
  ];

  ngOnChanges(): void {
    // Si Kammthaar est en ligne on récupère les informations en temps réel
    if(this.controllerData){
      this.updateGauges(this.controllerData);
      this.isLoading = false;
    }
  }

  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: Controller): void {
    if (!data) return;
    this.gauges = [
      { label: 'Voltage', value: data.voltage || 0, unit: 'V', max: 24 },
      { label: 'Ampérage', value: data.amperage || 0, unit: 'A', max: 30 },
      { label: 'Puissance', value: data.power || 0, unit: 'W', max: 100 }
    ];
  }

  // Méthode pour émettre un label sélectionné
  onViewGraph(label: string) {
    this.labelSelected.emit(label);
  }

}

