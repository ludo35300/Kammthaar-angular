import { Component, Input } from '@angular/core';
import { faCheck, faSun, faWarning } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../../services/serveur/serveur.service';
import { BehaviorSubject } from 'rxjs';
import { Raspberry } from '../../../modeles/server_infos';

@Component({
  selector: 'app-infos-serveur',
  templateUrl: './infos-serveur.component.html',
  styleUrl: './infos-serveur.component.scss'
})
export class InfosServeurComponent {
  systemInfo$: BehaviorSubject<Raspberry | null> = new BehaviorSubject<Raspberry | null>(null);
  
  isLoading = true;
  messageErreur = "";

  faWarning = faWarning;
  faCheck = faCheck;
  faSun = faSun;

  constructor(private serveurService: ServeurService){}

  ngOnInit(): void {
    this.getInfosServeur(); // 🔹 Charge les données au chargement du component
  }

  //  On récupère les infos du serveur Kammthaar en temps réel
  getInfosServeur(){ 
    this.serveurService.getSystemInfo().subscribe({
      next: (data) => {
        this.systemInfo$.next(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.messageErreur= `Erreur lors de la récupération des infos serveur: ${{err}}`;
        this.isLoading = false;
      }
    });
  }

}
