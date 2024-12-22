import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isSidebarOpen = true; // Par défaut, la sidebar est ouverte

  ngOnInit() {
    this.checkScreenSize(); // Vérifie la taille de l'écran au démarrage
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
