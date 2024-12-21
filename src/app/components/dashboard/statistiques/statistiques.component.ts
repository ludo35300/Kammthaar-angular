import { Component, Input } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { GaugesStatistiques, Statistiques } from '../../../modeles/statistiques';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.scss'
})
export class StatistiquesComponent {
  @Input() isServerOnline: boolean | null = null;
  isLoading = true;
  
  statistiquesData: Statistiques | null = null;

  // Configuration des gauges
  gauges: GaugesStatistiques[] = [
      { label: 'Générés aujourd\'hui', value: 0, unit: 'kWh', max: 10 },
      { label: 'Consommés aujourd\'hui', value: 0, unit: 'kWh', max: 10 },
      { label: 'Généré ce mois ci', value: 0, unit: 'kWh', max: 10 },
      { label: 'Consommé ce mois ci', value: 0, unit: 'kWh', max: 10 },
  ];

  constructor(
    private dashboardService: DashboardService
  ){}

  ngOnInit(){
    // Si Kammthaar est en ligne on récupère les informations en temps réel
    if(this.isServerOnline){
      this.getStatistiquesRealtime();
    // Sinon on récupère la derniere entrée enregistrée dans InfluxDB
    }else{
      this.getLastStatistiques();
    }
}

  // On récupère les statistiques du MPPT en temps réel
  getStatistiquesRealtime(){
    this.dashboardService.getStatistiquesRealtimeData().subscribe({
      next: (data) => {
        this.statistiquesData = data;
        this.updateGauges(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données de statistiques:', error);
        this.isLoading = false;
      },
    });
  }

  // On récupère les dernières statistiques enregistrées
  getLastStatistiques(){
    this.dashboardService.getLastStatistiques().subscribe({
      next: (data) => {
        this.statistiquesData = data;
        this.updateGauges(data);
        // this.updateStatistiquesData(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données de statistiques:', error);
        this.isLoading = false;
      },
    });
  }

  // Mise à jour des jauges en fonction des données récupérées
  updateGauges(data: Statistiques): void {
    if (!data) return;
    this.gauges = [
      { label: 'Générés aujourd\'hui', value: data.generated_energy_today, unit: 'kWh', max: 1.5 },
      { label: 'Consommés aujourd\'hui', value: data.consumed_energy_today, unit: 'kWh', max: 1.5 },
      // { label: 'Consommé ce mois ci', value: data.consumed_energy_month, unit: 'kWh', max: 10 },
    ];
  }
}
