import { Component, EventEmitter, Output } from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { faBars, faCheck, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { TITLE } from '../../constantes';
import { AuthService } from '../../services/auth/auth.service';

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
  isLoggedIn = false;
  username: string | undefined;


  constructor(
    private serveurService: ServeurService,
    public authService: AuthService,
  ){
    this.authService.authStatus$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );
  }

  ngOnInit(): void {
    this.serveurService.getServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
          this.isServerOnline = status;
      });
      if(this.isLoggedIn){
        this.authService.getUserInfo().subscribe(
          (response) => {
            this.username = response.username;
          },
          (error) => {
            console.error('Erreur de récupération des informations utilisateur', error);
          }
        );
      }
  }
  
}


