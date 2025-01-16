import { Component, Input } from '@angular/core';
import { ChargingEquipmentStatus } from '../../../modeles/chargingEquipmentStatus';
import { faCheck,  faInfo,  faInfoCircle,  faXmark } from '@fortawesome/free-solid-svg-icons';
import { ChargingStatus, ChargingStatusDescriptions, VoltageChargingStatus, VoltageStatusChargingDescriptions } from '../../../enums';

@Component({
  selector: 'app-charging',
  templateUrl: './charging.component.html',
  styleUrl: './charging.component.scss'
})
export class ChargingComponent {
  @Input() chargingEquipmentStatus: ChargingEquipmentStatus | null = null;

  faCheck = faCheck;
  faXmark = faXmark;
  faInfoCircle = faInfoCircle;

  getVoltageStatus(status: string | null): string {
      if (!status) { return 'Inconnu'; }
      // Convertir la clé pour matcher avec l'enum 
      const formattedKey = status.replace(' ', '_').toUpperCase() as keyof typeof VoltageChargingStatus;
      return VoltageChargingStatus[formattedKey] || 'Inconnu';
  }
  getDescriptionVoltageStatus(status: string | null): string {
    if (!status) { return 'Inconnu'; } // Gestion du cas où le statut est null ou vide
    // Convertir la chaîne pour qu'elle corresponde au format des clés de l'enum
    const formattedKey = status.replace(' ', '_').toUpperCase() as keyof typeof VoltageChargingStatus;
    // Vérifier si la clé existe dans l'enum et obtenir la description
    if (VoltageChargingStatus[formattedKey]) {
        const description = VoltageStatusChargingDescriptions.get(VoltageChargingStatus[formattedKey]);
        return description || 'Description indisponible'; // Retourne la description ou un message par défaut
    }
    return 'Inconnu'; // Si la clé n'est pas trouvée, retourner 'Inconnu'
  }
  getChargingStatus(status: string | null): string {
    if (!status) { return 'Inconnu'; }
    // Convertir la clé pour matcher avec l'enum 
    const formattedKey = status.replace(' ', '_').toUpperCase() as keyof typeof ChargingStatus;
    return ChargingStatus[formattedKey] || 'Inconnu';
  }
  getDescriptionChargingStatus(status: string | null): string {
    if (!status) { return 'Inconnu'; } // Gestion du cas où le statut est null ou vide
    // Convertir la chaîne pour qu'elle corresponde au format des clés de l'enum
    const formattedKey = status.replace(' ', '_').toUpperCase() as keyof typeof ChargingStatus;
    // Vérifier si la clé existe dans l'enum et obtenir la description
    if (ChargingStatus[formattedKey]) {
        const description = ChargingStatusDescriptions.get(ChargingStatus[formattedKey]);
        return description || 'Description indisponible'; // Retourne la description ou un message par défaut
    }
    return 'Inconnu'; // Si la clé n'est pas trouvée, retourner 'Inconnu'
  }
}
