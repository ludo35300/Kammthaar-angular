import { Component, Input } from '@angular/core';
import { faCheck, faXmark, faUser, faCarBattery, faDumpster, faSolarPanel, faLocationArrow, faChevronDown, faBars, faChevronRight, faInfoCircle, faCogs, faPlugCircleMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen: boolean = true; // Permet de gérer l'état ouvert/fermé

  isBatteryOpen = false; // Contrôle si le sous-menu Batterie est ouvert ou non

  faChevronRight = faChevronRight;
  faCheck = faCheck
  faXmark = faXmark
  faUser = faUser
  faCarBattery = faCarBattery
  faDumpster = faDumpster
  faSolarPanel = faSolarPanel
  faLocationArrow = faLocationArrow
  faPlugCircleMinus = faPlugCircleMinus
  faChevronDown = faChevronDown
  faBars = faBars
  faInfoCircle = faInfoCircle
  faCogs = faCogs

  toggleBatteryDropdown(): void {
    this.isBatteryOpen = !this.isBatteryOpen;
  }

}
