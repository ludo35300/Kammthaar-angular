import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gauge, Ps } from '../../../modeles/ps';
import { faArrowRight, faBolt, faChartArea, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ps-data',
  templateUrl: './ps-data.component.html',
  styleUrl: './ps-data.component.scss'
})
export class PsDataComponent {
  @Output() labelSelected = new EventEmitter<string>();
  @Input() psData: Ps | null = null;
  isLoading = true;

  faArrowRight = faArrowRight;
  faSun = faSun;
  faBolt = faBolt;
  faChart = faChartArea;

  // Configuration des jauges
  gauges: Gauge[] = [
    { label: 'Voltage', value: 0, unit: 'V', max: 55, dataKey: 'voltageData', chartData: null },
    { label: 'Ampérage', value: 0, unit: 'A', max: 30, dataKey: 'amperageData', chartData: null },
    { label: 'Puissance', value: 0, unit: 'W', max: 500, dataKey: 'powerData', chartData: null }
  ];

  ngOnChanges(): void {
    if(this.psData){
      this.updateGauges(this.psData);
      this.isLoading = false;
    }
  }

  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: Ps): void {
    if (!data) return;
    this.gauges.forEach((gauge) => {
      switch (gauge.dataKey) {
        case 'voltageData':
          gauge.value = data.ps_voltage || 0;
          break;
        case 'amperageData':
          gauge.value = data.ps_amperage || 0;
          break;
        case 'powerData':
          gauge.value = data.ps_power || 0;
          break;
      }
    });
  }

  // Méthode pour émettre un label sélectionné
  onViewGraph(label: string) {
    this.labelSelected.emit(label);
  }

}
