import { Component, Input } from '@angular/core';
import { faChargingStation } from '@fortawesome/free-solid-svg-icons';
import { EnergyStatistics } from '../../../modeles/energyStatistics';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrl: './bienvenue.component.scss'
})
export class BienvenueComponent {
  isLoading = true;
    
  @Input() energyStatistics: EnergyStatistics | null = null;

  // a changer lors de l'intégration du login
  nom = "Ludo";

  faChargingStation = faChargingStation;
  

}
