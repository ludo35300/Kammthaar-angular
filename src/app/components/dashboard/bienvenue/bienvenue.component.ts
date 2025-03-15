import { Component, Input } from '@angular/core';
import { faChargingStation } from '@fortawesome/free-solid-svg-icons';
import { EnergyStatistics } from '../../../modeles/energyStatistics';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrl: './bienvenue.component.scss'
})
export class BienvenueComponent {
  isLoading = true;
    
  @Input() energyStatistics: EnergyStatistics | null = null;
   constructor(
      public authService: AuthService, 
    ){}

  faChargingStation = faChargingStation;
  

}
