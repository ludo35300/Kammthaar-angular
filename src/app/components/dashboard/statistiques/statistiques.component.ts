import { Component, Input } from '@angular/core';
import { EnergyStatistics } from '../../../modeles/energyStatistics';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.scss'
})
export class StatistiquesComponent {
  isLoading = true;
  
  @Input() energyStatistics: EnergyStatistics | null = null;

  // Configuration des gauges
  gauges= [
      { label: 'Générés aujourd\'hui', value: 0, unit: 'kWh', max: 10 },
      { label: 'Consommés aujourd\'hui', value: 0, unit: 'kWh', max: 10 }
  ];

  ngOnChanges(){
    if(this.energyStatistics){
      this.updateGauges(this.energyStatistics);
      this.isLoading = false;
    }
  }
  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: EnergyStatistics): void {
    if (!data) return;
    this.gauges = [
      { label: 'Générés aujourd\'hui', value: data.generated_today, unit: 'kWh', max: 1.5 },
      { label: 'Consommés aujourd\'hui', value: data.consumed_today, unit: 'kWh', max: 1.5 },
    ];
  }
}
