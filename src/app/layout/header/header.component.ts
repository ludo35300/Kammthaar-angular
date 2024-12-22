import { Component, EventEmitter, Output } from '@angular/core';
import { faBars, faCarBattery, faCheck, faChevronDown, faDumpster, faLocationArrow, faSolarPanel, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { TITLE } from '../../constantes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  isSidebarOpen = true; // Par défaut, la sidebar est ouverte

  
  isServerOnline: boolean | null = null;
  title = TITLE
  faCheck = faCheck
  faXmark = faXmark
  faUser = faUser
  faCarBattery = faCarBattery
  faDumpster = faDumpster
  faSolarPanel = faSolarPanel
  faLocationArrow = faLocationArrow
  faChevronDown = faChevronDown
  faBars = faBars
  

  constructor(private serveurService: ServeurService){}

  ngOnInit() {
    // Vérification si le serveur est connecté à Internet ou pas
    this.serveurService.serverStatus$.subscribe((status) => {
      if (status !== this.isServerOnline) {
         this.isServerOnline = status;
      }
    });
  }
}
