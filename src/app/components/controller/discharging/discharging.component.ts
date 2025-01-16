import { Component, Input } from '@angular/core';
import { DischargingEquipmentStatus } from '../../../modeles/dischargingEquipmentStatus';
import { faCheck, faXmark, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { DischargingStatus, DischargingStatusDescriptions, VoltageDischargingStatus, VoltageStatusDischargingDescriptions } from '../../../enums';

@Component({
  selector: 'app-discharging',
  templateUrl: './discharging.component.html',
  styleUrl: './discharging.component.scss'
})
export class DischargingComponent {
  @Input() dischargingEquipmentStatus: DischargingEquipmentStatus | null = null;
  faCheck = faCheck;
  faXmark = faXmark;
  faInfoCircle = faInfoCircle;

  getVoltageStatus(status: string | null): string {
        if (!status) { return 'Inconnu'; }
        // Convertir la clé pour matcher avec l'enum 
        const formattedKey = status.replace(' ', '_').toUpperCase() as keyof typeof VoltageDischargingStatus;
        return VoltageDischargingStatus[formattedKey] || 'Inconnu';
    }
    getDescriptionVoltageStatus(status: string | null): string {
      if (!status) { return 'Inconnu'; } // Gestion du cas où le statut est null ou vide
      // Convertir la chaîne pour qu'elle corresponde au format des clés de l'enum
      const formattedKey = status.replace(' ', '_').toUpperCase() as keyof typeof VoltageDischargingStatus;
      // Vérifier si la clé existe dans l'enum et obtenir la description
      if (VoltageDischargingStatus[formattedKey]) {
          const description = VoltageStatusDischargingDescriptions.get(VoltageDischargingStatus[formattedKey]);
          return description || 'Description indisponible'; // Retourne la description ou un message par défaut
      }
      return 'Inconnu'; // Si la clé n'est pas trouvée, retourner 'Inconnu'
    }

  getDischargingStatus(status: string | null): string {
      if (!status) { return 'Inconnu'; }
      // Convertir la clé pour matcher avec l'enum 
      const formattedKey = status.replace(' ', '_').toUpperCase() as keyof typeof DischargingStatus;
      return DischargingStatus[formattedKey] || 'Inconnu';
  }
  getDescriptionDischargingStatus(status: string | null): string {
    if (!status) { return 'Inconnu'; } // Gestion du cas où le statut est null ou vide
    // Convertir la chaîne pour qu'elle corresponde au format des clés de l'enum
    const formattedKey = status.replace(' ', '_').toUpperCase() as keyof typeof DischargingStatus;
    // Vérifier si la clé existe dans l'enum et obtenir la description
    if (DischargingStatus[formattedKey]) {
        const description = DischargingStatusDescriptions.get(DischargingStatus[formattedKey]);
        return description || 'Description indisponible'; // Retourne la description ou un message par défaut
    }
    return 'Inconnu'; // Si la clé n'est pas trouvée, retourner 'Inconnu'
  }
}
