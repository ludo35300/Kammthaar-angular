import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faBars, faCarBattery, faCheck, faChevronDown, faDumpster, faLocationArrow, faSolarPanel, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { TITLE } from '../../constantes';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() isServerOnline: boolean | null = null;
  isSidebarOpen = true; // Par défaut, la sidebar est ouverte
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

  constructor(
    private serveurService: ServeurService
  ){}

  ngOnInit(): void {
    this.serveurService.getServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
          this.isServerOnline = status;
      });
  }
  
}


