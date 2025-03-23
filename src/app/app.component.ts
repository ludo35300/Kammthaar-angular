import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { ServeurService } from './services/serveur/serveur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  isSidebarOpen = true;   // La sidebar est ouverte par défault
  isLoading = true;
  constructor(private authService: AuthService, private serveurService: ServeurService){}

  ngOnInit() {
    this.checkScreenSize();             // Vérifie la taille de l'écran au démarrage
    
    // this.authService.checkAuthStatus(); // Vérifie l'authentification au démarrage
    this.authService.authStatus$.subscribe(
      (isAuthenticated) => {
        if(!isAuthenticated){
          this.isLoading = false;
        }
      }
    );
    this.serveurService.checkServerStatus();  // Verifie si le serveur est connecté
  }

  // Écoute l'événement de redimensionnement de la fenêtre
  @HostListener('window:resize', ['$event']) 

  // Si la taille de l'écran est inférieure à 1100px, la sidebar est fermée 
  checkScreenSize() {
    this.isSidebarOpen = window.innerWidth > 1100;
  }
  
  // Bascule la visibilité de la sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
