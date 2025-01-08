import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Batterie } from '../../../modeles/batterie';
import { faBolt, faCarBattery, faChartArea, faSun } from '@fortawesome/free-solid-svg-icons';
import { BatterieService } from '../../../services/batterie/batterie.service';
@Component({
  selector: 'app-batterie-data',
  templateUrl: './batterie-data.component.html',
  styleUrl: './batterie-data.component.scss'
})
export class BatterieDataComponent {
  @Input() batterieData: Batterie | null = null;
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
    console.log(this.batterieData)
    if(this.batterieData){
      this.updateGauges(this.batterieData);
      this.isLoading = false;
    }
  }

  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: Batterie): void {
    if (!data) return;

    this.gauges = [
      { label: 'Voltage', value: data.battery_voltage || 0, unit: 'V', max: 50 },
      { label: 'Ampérage', value: data.battery_amperage || 0, unit: 'A', max: 30 },
      { label: 'Puissance', value: data.battery_power || 0, unit: 'W', max: 400 }
    ];
  }

  // Méthode pour émettre un label sélectionné
  onViewGraph(label: string) {
    this.labelSelected.emit(label);
  }
}

