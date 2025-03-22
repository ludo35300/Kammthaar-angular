import { Component, Input } from '@angular/core';
import { faChargingStation, faSun } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrl: './bienvenue.component.scss'
})
export class BienvenueComponent {
  faChargingStation = faChargingStation;
  username?: string;
  faSun = faSun;
  @Input() isServerOnline: boolean = false;
  isLoadingPv = true;
  
  constructor(public authService: AuthService){}

  ngOnInit(){
    // Vérifie si l'utilisateur est connecté et récupère les informations de l'utilisateur
    this.authService.authStatus$.subscribe(isAuthenticated => {
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
