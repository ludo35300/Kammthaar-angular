import { Component } from '@angular/core';
import { ServeurService } from './services/serveur/serveur.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kammthaar';

  constructor(private serveurService: ServeurService){}


  // ngOnInit(): void {
  //   this.serveurService.checkServerStatus().subscribe({
  //     next: (status) => {
  //       console.log("Statut du serveur : ", status);
  //     },
  //     error: (err) => {
  //       // Empêche l'erreur 404 d'être affichée dans la console
  //       console.log("Le serveur est inaccessible, statut : 404 (NOT FOUND)");
  //     }
  //   });
  // }


}
