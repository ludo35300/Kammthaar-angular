import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowRight, faBolt, faChartArea, faSun } from '@fortawesome/free-solid-svg-icons';
import { SolarData } from '../../../modeles/solarData';

@Component({
  selector: 'app-ps-data',
  templateUrl: './ps-data.component.html',
  styleUrl: './ps-data.component.scss'
})
export class PsDataComponent {
  @Output() labelSelected = new EventEmitter<string>();
  @Input() solarData: SolarData | null = null;
  isLoading = true;

  faArrowRight = faArrowRight;
  faSun = faSun;
  faBolt = faBolt;
  faChart = faChartArea;

  gauges = [
    { label: 'Voltage', value: 0, unit: 'V', max: 55 },
    { label: 'Ampérage', value: 0, unit: 'A', max: 30 },
    { label: 'Puissance', value: 0, unit: 'W', max: 500 },
  ];

  ngOnChanges(): void {
    if(this.solarData){
      this.updateGauges(this.solarData);
      this.isLoading = false;
    }
  }
  updateGauges(data: SolarData): void {
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
