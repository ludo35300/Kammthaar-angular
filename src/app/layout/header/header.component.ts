import { Component, EventEmitter, Output } from '@angular/core';
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
  isServerOnline: boolean = false;
  isLoggedIn: boolean = false;
  isSidebarOpen = true; // Par défaut, la sidebar est ouverte
  title = TITLE
  faCheck = faCheck
  faXmark = faXmark
  faUser = faUser
  faBars = faBars
  username: string | undefined;

  constructor(private serveurService: ServeurService,  public authService: AuthService){}

  ngOnInit(): void {
    // Vérifie le statust du serveur
    this.serveurService.serverStatus$.subscribe(status => {
      this.isServerOnline = status;
    });

     // Vérifie si l'utilisateur est connecté et récupère les informations de l'utilisateur
     this.authService.authStatus$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      if (isAuthenticated) {
        // Récupérer les informations de l'utilisateur uniquement si l'utilisateur est connecté
        this.authService.getUserInfo().subscribe({
          next: (response) => {
            this.username = response.username;
          }
        });
      }
     });
  }
  
}


