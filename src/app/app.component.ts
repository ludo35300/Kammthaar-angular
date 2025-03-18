import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  isSidebarOpen = true;   // La sidebar est ouverte par défault
  isServerOnline: boolean | null = null;
  
  constructor(private authService: AuthService){}

  ngOnInit() {
    this.checkScreenSize();             // Vérifie la taille de l'écran au démarrage
    this.authService.checkAuthStatus(); // Vérifie l'authentification au démarrage
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
