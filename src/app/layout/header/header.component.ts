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
    this.serveurService.getServerStatus()
    .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
    .subscribe((status) => {
        this.isServerOnline = status;
    });
    // Vérifie si l'utilisateur est connecté
    if(this.authService.isAuthenticated()){
      this.isLoggedIn = true;
    }
    // Récupère les informations de l'utilisateur
    if(this.isLoggedIn){
      this.authService.getUserInfo().subscribe({
        next:(response) => {
          this.username = response.username;
        },
        error: (error) => {
          console.error('Erreur de récupération des informations utilisateur', error);
        }
      });
    }
  }
  
}


