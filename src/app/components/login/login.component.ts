import { Component, Signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { ServeurService } from '../../services/serveur/serveur.service';
import { faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  isLoading: boolean = true;
  faSun = faSun;
  isLoggedIn: boolean = false;

  erreurMessageConnexion: string | null = null;

  constructor(public authService: AuthService,public serveurService: ServeurService, private router: Router) {}
  ngOnInit() {
      // Récupérer le statut d'authentification
      this.authService.isAuthenticated().subscribe({
      next: (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
        setTimeout(() => {
          this.isLoading = false; // Arrêter le chargement après 1 seconde
          if (isAuthenticated) {
            this.router.navigate(['/dashboard']); // Rediriger si connecté
          }
        }, 1000); // 1 seconde
      },
      error: () => {
        this.isLoading = false; // Même en cas d'erreur, on arrête le chargement
      },
    });
   

    // Récupération des messages d'erreur de connexion à Kammthaar (Raspberry)
    this.authService.erreurConnexion$.subscribe((message) => {
      this.erreurMessageConnexion = message; // Mettre à jour l'erreur dans le composant
    });
  }

  
  login(): void {
    this.authService.login(this.username, this.password)
    this.isLoading=true;
  }

  logout(): void {
    this.authService.logout();
    this.isLoading=false;
  }

}
