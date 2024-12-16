import { Component } from '@angular/core';
import { GaugesStatistiques, Statistiques } from '../../modeles/statistiques';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { faArrowRight, faChartLine, faCheck, faMoon, faSun, faWarning } from '@fortawesome/free-solid-svg-icons';
import { ControllerService } from '../../services/controller/controller.service';
import { Controller } from '../../modeles/controller';
import { ServeurService } from '../../services/serveur/serveur.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  statistiquesRealtimeData : Statistiques | null = null;
  lastStatistiquesData : Statistiques | null = null;
  controllerRealtimeData : Controller | null = null;
  isServerOnline: boolean | null = null;
  faWarning = faWarning
  systemInfo: any;
  consumed_server:number = 0;
  isLoading = true;
  faArrowRight = faArrowRight
  faSun = faSun
  faMoon = faMoon
  faChart = faChartLine
  faCheck = faCheck


  // Configuration des jauges
  gauges: GaugesStatistiques[] = [
    { label: 'Générés aujourd\'hui', value: 0, unit: 'kWh', max: 10 },
    { label: 'Consommés aujourd\'hui', value: 0, unit: 'kWh', max: 10 },
    { label: 'Généré ce mois ci', value: 0, unit: 'kWh', max: 10 },
    { label: 'Consommé ce mois ci', value: 0, unit: 'kWh', max: 10 },
  ];
  // statistiquesData: { label: string; value: number; unit: string }[] = [];


  constructor(
    private dashboardService: DashboardService,
    private serveurService: ServeurService
  ){}

  ngOnInit(): void {
    // Vérificaton si Kammthaar est en ligne
    this.serveurService.serverStatus$.subscribe((status) => {
      this.isServerOnline = status;
      

    });
    
    // Ajout d'un délai avant d'exécuter la logique
    setTimeout(() => {
      if (this.isServerOnline) {
        this.getStatistiquesRealtime();
        this.getInfosServeur();
      } else {
        this.getLastStatistiques();
      }
    }, 1000); // Délai de 2 secondes
    
    
  }



  //  On récupère les infos du serveur Kammthaar en temps réel
  getInfosServeur(){ 
    this.serveurService.getSystemInfo().subscribe({
      next: (data) => (this.systemInfo = data),
      error: (err) => console.error('Erreur lors de la récupération des données système:', err),
    });
  }
  
  // On récupère les statistiques du MPPT en temps réel
  getStatistiquesRealtime(){
    this.dashboardService.getStatistiquesRealtimeData().subscribe({
      next: (data) => {
        this.statistiquesRealtimeData = data;
        this.updateGauges(data);
        this.isLoading = false;
        this.lastStatistiquesData = null;
        this.consumed_server=this.statistiquesRealtimeData.generated_energy_today-this.statistiquesRealtimeData.consumed_energy_today;
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
        this.lastStatistiquesData = data;
        this.updateGauges(data);
        // this.updateStatistiquesData(data);
        this.isLoading = false;
        this.controllerRealtimeData=null;
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
      { label: 'Généré ce mois ci', value: data.generated_energy_month, unit: 'kWh', max: 10 },
      { label: 'Consommé ce mois ci', value: data.consumed_energy_month, unit: 'kWh', max: 10 },
    ];
  }
  //Mise
  // updateStatistiquesData(data: Statistiques): void {
  //   this.statistiquesData = [
  //     { label: 'Énergie générée aujourd\'hui', value: data.generated_energy_today, unit: 'kWh' },
  //     { label: 'Énergie consommée aujourd\'hui', value: data.consumed_energy_today, unit: 'kWh' },
  //     { label: 'Énergie générée ce mois', value: data.generated_energy_month, unit: 'kWh' },
  //     { label: 'Énergie consommée ce mois', value: data.consumed_energy_month, unit: 'kWh' },
  //   ];
  // }

}
