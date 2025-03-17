import { Component, HostListener } from '@angular/core';
import { ServeurService } from './services/serveur/serveur.service';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isSidebarOpen = true; // Par défaut, la sidebar est ouverte
  isServerOnline: boolean | null = null;
  
  constructor(
      private serveurService: ServeurService,private authService: AuthService, private router: Router  ){
        // this.checkLoginStatus();
      }

  ngOnInit() {
    this.checkScreenSize(); // Vérifie la taille de l'écran au démarrage
    this.authService.checkAuthStatus();
  }

  // Écouter l'événement de redimensionnement de la fenêtre
  @HostListener('window:resize', ['$event'])
  

  // Vérifie la taille de l'écran et met à jour la valeur de isSidebarOpen
  checkScreenSize() {
    if (window.innerWidth <= 1100) {
      this.isSidebarOpen = false; // Ferme la sidebar si l'écran est petit
    } else {
      this.isSidebarOpen = true;  // Garde la sidebar ouverte si l'écran est plus grand
    }
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Bascule la visibilité de la sidebar
  }

}
