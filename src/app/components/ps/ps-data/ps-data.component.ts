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

  // Configuration des jauges
  // gauges: Gauge[] = [
  //   { label: 'Voltage', value: 0, unit: 'V', max: 55, chartData: null },
  //   { label: 'Ampérage', value: 0, unit: 'A', max: 30, dataKey: 'amperageData', chartData: null },
  //   { label: 'Puissance', value: 0, unit: 'W', max: 500, dataKey: 'powerData', chartData: null }
  // ];
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
  
      this.gauges = [
        { label: 'Voltage', value: data.voltage || 0, unit: 'V', max: 50 },
        { label: 'Ampérage', value: data.current || 0, unit: 'A', max: 30 },
        { label: 'Puissance', value: data.power || 0, unit: 'W', max: 400 }
      ];
   }
  // Mise à jour des jauges en fonction des données récupérées
  // updateGauges(data: SolarData): void {
  //   if (!data) return;
  //   this.gauges.forEach((gauge) => {
  //     switch (gauge.dataKey) {
  //       case 'voltageData':
  //         gauge.value = data.voltage || 0;
  //         break;
  //       case 'amperageData':
  //         gauge.value = data.current || 0;
  //         break;
  //       case 'powerData':
  //         gauge.value = data.power || 0;
  //         break;
  //     }
  //   });
  // }

  // Méthode pour émettre un label sélectionné
  onViewGraph(label: string) {
    this.labelSelected.emit(label);
  }

}
