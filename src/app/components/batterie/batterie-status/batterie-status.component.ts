import { Component, Input } from '@angular/core';
import { BatterieStatus } from '../../../modeles/batterie-status';
import { faCog, faHeartPulse, faSun } from '@fortawesome/free-solid-svg-icons';
import { BatteryStatus, TemperatureStatus } from '../../../enums';
import { BatterieStatusService } from '../../../services/batterie-status/batterie-status.service';

@Component({
  selector: 'app-batterie-status',
  templateUrl: './batterie-status.component.html',
  styleUrl: './batterie-status.component.scss'
})
export class BatterieStatusComponent {
  @Input() batterieStatusData: BatterieStatus | null = null;

  isLoading = true;

  faHeartPulse = faHeartPulse;
  faSun = faSun;
  faCog = faCog;

  
  ngOnChanges(){
    if(this.batterieStatusData){
      this.isLoading = false;
    }
  }
  
  

  getTemperature(status: string | null): string {
    if (!status) {
      return 'Inconnue';
    }
    // Convertir la clé pour matcher avec l'enum (case insensitive)
    const formattedKey = status.replace(' ', '_').toUpperCase() as keyof typeof TemperatureStatus;
    return TemperatureStatus[formattedKey] || 'Inconnue';
  }
  getStatus(status: string | null): string {
    if (!status) {
      return 'Inconnu';
    }
    // Convertir la clé pour matcher avec l'enum (case insensitive)
    const formattedKey = status.replace(' ', '_').toUpperCase() as keyof typeof BatteryStatus;
    return BatteryStatus[formattedKey] || 'Inconnu';
  }

  // Méthode pour obtenir la classe CSS du badge selon l'état
  getBadgeClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'NORMAL':
        return 'badge bg-success';
      case 'OVERVOLT':
      case 'OVER TEMP':
      case 'LOW TEMP':
        return 'badge bg-warning';
      case 'UNDERVOLT':
      case 'LOW VOLT DISCONNECT':
      case 'FAULT':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

}
