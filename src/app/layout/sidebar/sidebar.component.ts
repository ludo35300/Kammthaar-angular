import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faXmark, faUser, faCarBattery, faDumpster, faSolarPanel, faLocationArrow, faChevronDown, faBars, faChevronRight, faInfoCircle, faCogs, faPlugCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen: boolean = true; // Permet de gérer l'état ouvert/fermé
  @Output() toggleSidebar = new EventEmitter<void>();
  
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
  isLoggedIn = false;
  
  constructor(public authService: AuthService,){}
  
  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.isLoggedIn = true;
    }
  }

  closeSidebar(): void {
    if (window.innerWidth <= 1100) {
      // Se ferme uniquement si l'écran est petit (mobile/tablette)
      this.isOpen = false;
      this.toggleSidebar.emit()
    }
  }

}
