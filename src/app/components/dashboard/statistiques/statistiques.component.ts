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

  updateGauges(data: EnergyStatistics): void {
      if (!data) return;
      // Met à jour chaque gauge sans réinitialiser l'ensemble du tableau
      const generatedToday = this.gauges.find(gauge => gauge.label === 'Générés aujourd\'hui');
      const consumedToday = this.gauges.find(gauge => gauge.label === 'Consommés aujourd\'hui');
      if (generatedToday) generatedToday.value = data.generated_today;
      if (consumedToday) consumedToday.value = data.consumed_today;
    }
}
