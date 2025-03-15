import { Component, EventEmitter, Output } from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { faBars, faCheck, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { TITLE } from '../../constantes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  isServerOnline: boolean  = false;
  isSidebarOpen = true; // Par défaut, la sidebar est ouverte
  title = TITLE
  faCheck = faCheck
  faXmark = faXmark
  faUser = faUser
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


