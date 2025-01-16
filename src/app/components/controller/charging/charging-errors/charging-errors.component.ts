import { Component, Input } from '@angular/core';
import { ChargingEquipmentStatus } from '../../../../modeles/chargingEquipmentStatus';
import { faCheck, faInfoCircle, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-charging-errors',
  templateUrl: './charging-errors.component.html',
  styleUrl: './charging-errors.component.scss'
})
export class ChargingErrorsComponent {
  @Input() chargingEquipmentStatus: ChargingEquipmentStatus | null = null;
  
    faCheck = faCheck;
    faXmark = faXmark;
    faInfoCircle = faInfoCircle;

}
