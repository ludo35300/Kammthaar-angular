import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  isLoading=true;

  faSun = faSun;

  erreurMessageConnexion: string | null = null;

  constructor(public authService: AuthService,public serveurService: ServeurService, private router: Router) {}
  ngOnInit() {
    this.authService.checkAuthStatus();
    this.authService.authStatus$.subscribe(
      (isAuthenticated) => {
         this.isLoading = false; 
        if(isAuthenticated){
          this.router.navigate(['/dashboard']);
        }
      }
    );
    // Récupération des messages d'erreur de connexion à Kammthaar (Raspberry)
    this.authService.erreurConnexion$.subscribe((message) => {
      this.erreurMessageConnexion = message; // Mettre à jour l'erreur dans le composant
    });

    // Récupération des messages d'erreur de connexion à Kammthaar (Raspberry)
    this.serveurService.errorMessage$.subscribe((message) => {
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
