import { Component, Input } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { GaugesStatistiques, Statistiques } from '../../../modeles/statistiques';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.scss'
})
export class StatistiquesComponent {
  isLoading = true;
  
  @Input() statistiquesData: Statistiques | null = null;

  // Configuration des gauges
  gauges: GaugesStatistiques[] = [
      { label: 'Générés aujourd\'hui', value: 0, unit: 'kWh', max: 10 },
      { label: 'Consommés aujourd\'hui', value: 0, unit: 'kWh', max: 10 }
  ];

  constructor(
    private dashboardService: DashboardService
  ){}

  ngOnChanges(){
    if(this.statistiquesData){
      this.updateGauges(this.statistiquesData);
      this.isLoading = false;
    }
      
  }

  

  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: Statistiques): void {
    if (!data) return;
    this.gauges = [
      { label: 'Générés aujourd\'hui', value: data.generated_energy_today, unit: 'kWh', max: 1.5 },
      { label: 'Consommés aujourd\'hui', value: data.consumed_energy_today, unit: 'kWh', max: 1.5 },
    ];
  }
}
