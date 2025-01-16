import { Component, Input } from '@angular/core';
import { DischargingEquipmentStatus } from '../../../../modeles/dischargingEquipmentStatus';
import { faCheck, faInfoCircle, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-discharging-errors',
  templateUrl: './discharging-errors.component.html',
  styleUrl: './discharging-errors.component.scss'
})
export class DischargingErrorsComponent {
  @Input() dischargingEquipmentStatus: DischargingEquipmentStatus | null = null;
  
  faCheck = faCheck;
  faXmark = faXmark;
  faInfoCircle = faInfoCircle;

}