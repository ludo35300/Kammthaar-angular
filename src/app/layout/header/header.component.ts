import { Component, EventEmitter, Output } from '@angular/core';
import { faCarBattery, faCheck, faChevronDown, faDumpster, faLocationArrow, faSolarPanel, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { TITLE } from '../../constantes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
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
  

  constructor(private serveurService: ServeurService){}

  ngOnInit() {

    this.serveurService.serverStatus$.subscribe((status) => {
      if (status !== this.isServerOnline) {
         this.isServerOnline = status;
      }
    });

    
  }
}
