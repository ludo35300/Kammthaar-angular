import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faBolt, faChartArea, faSun } from '@fortawesome/free-solid-svg-icons';
import { LoadData } from '../../../modeles/loadData';

@Component({
  selector: 'app-consommation-data',
  templateUrl: './consommation-data.component.html',
  styleUrl: './consommation-data.component.scss'
})

export class ControllerDataComponent {
  @Output() labelSelected = new EventEmitter<string>();
  isLoading = true;

  @Input()loadData: LoadData | null = null;

  faSun = faSun;
  faChart = faChartArea;
  faBolt = faBolt;

  gauges = [
    { label: 'Voltage', value: 0, unit: 'V', max: 55 },
    { label: 'Ampérage', value: 0, unit: 'A', max: 30 },
    { label: 'Puissance', value: 0, unit: 'W', max: 500 }
  ];

  ngOnChanges(): void {
    // Si Kammthaar est en ligne on récupère les informations en temps réel
    if(this.loadData){
      this.updateGauges(this.loadData);
      this.isLoading = false;
    }
  }

  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: LoadData): void {
    if (!data) return;
    // Met à jour chaque gauge sans réinitialiser l'ensemble du tableau
    const voltageGauge = this.gauges.find(gauge => gauge.label === 'Voltage');
    const amperageGauge = this.gauges.find(gauge => gauge.label === 'Ampérage');
    const powerGauge = this.gauges.find(gauge => gauge.label === 'Puissance');

    if (voltageGauge) voltageGauge.value = data.voltage;
    if (amperageGauge) amperageGauge.value = data.current;
    if (powerGauge) powerGauge.value = data.power;
  }

  // Méthode pour émettre un label sélectionné
  onViewGraph(label: string) {
    this.labelSelected.emit(label);
  }

}

