import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faBolt, faCarBattery, faChartArea, faSun } from '@fortawesome/free-solid-svg-icons';
import { BatteryStatus } from '../../../modeles/batteryStatus';
@Component({
  selector: 'app-batterie-data',
  templateUrl: './batterie-data.component.html',
  styleUrl: './batterie-data.component.scss'
})
export class BatterieDataComponent {
  @Input() batteryStatus: BatteryStatus | null = null;
  @Output() labelSelected = new EventEmitter<string>();
  isLoading = true;

  faCarBattery = faCarBattery
  faBolt = faBolt
  faChart = faChartArea
  faSun = faSun
  
  // Configuration des jauges
  gauges = [
    { label: 'Voltage', value: 0, unit: 'V', max: 55 },
    { label: 'Ampérage', value: 0, unit: 'A', max: 30 },
    { label: 'Puissance', value: 0, unit: 'W', max: 500 },
  ];

  ngOnChanges(){
    if(this.batteryStatus){
      this.updateGauges(this.batteryStatus);
      this.isLoading = false;
    }
  }

  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: BatteryStatus): void {
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

