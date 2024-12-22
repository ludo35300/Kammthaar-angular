import { Component, Input } from '@angular/core';
import { faCheck, faXmark, faUser, faCarBattery, faDumpster, faSolarPanel, faLocationArrow, faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen: boolean = true; // Permet de gérer l'état ouvert/fermé

  faCheck = faCheck
    faXmark = faXmark
    faUser = faUser
    faCarBattery = faCarBattery
    faDumpster = faDumpster
    faSolarPanel = faSolarPanel
    faLocationArrow = faLocationArrow
    faChevronDown = faChevronDown
    faBars = faBars

}
