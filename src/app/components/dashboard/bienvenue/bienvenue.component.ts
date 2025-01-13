import { Component, Input } from '@angular/core';
import { faChargingStation } from '@fortawesome/free-solid-svg-icons';
import { Statistiques } from '../../../modeles/statistiques';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrl: './bienvenue.component.scss'
})
export class BienvenueComponent {
  isLoading = true;
    
  @Input() statistiquesData: Statistiques | null = null;

  // a changer lors de l'intégration du login
  nom = "Ludo";

  faChargingStation = faChargingStation;
  

  // constructor(
  //     private dashboardService: DashboardService
  //   ){}

//   ngOnChanges(){
//     // Si Kammthaar est en ligne on récupère les informations en temps réel
//     if(this.isServerOnline){
//       this.getStatistiquesRealtime();
//     // Sinon on récupère la derniere entrée enregistrée dans InfluxDB
//     }else{
//       this.getLastStatistiques();
//     }
// }

//   // On récupère les statistiques du MPPT en temps réel
//   getStatistiquesRealtime(){
//     this.dashboardService.getStatistiquesRealtimeData().subscribe({
//       next: (data) => {
//         this.statistiquesData = data;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors de la récupération des données de statistiques:', error);
//         this.isLoading = false;
//       },
//     });
//   }

//   // On récupère les dernières statistiques enregistrées
//   getLastStatistiques(){
//     this.dashboardService.getLastStatistiques().subscribe({
//       next: (data) => {
//         this.statistiquesData = data;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Erreur lors de la récupération des données de statistiques:', error);
//         this.isLoading = false;
//       },
//     });
//   }

  



}
