import { Component, Input, OnInit } from '@angular/core';
import { BatterieParametres } from '../../../modeles/batterie_parametres';
import { ServeurService } from '../../../services/serveur/serveur.service';
import { BatterieParametresService } from '../../../services/batterie-parametres/batterie-parametres.service';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-batterie-parametres',
  templateUrl: './batterie-parametres.component.html',
  styleUrl: './batterie-parametres.component.scss'
})
export class BatterieParametresComponent implements OnInit{
  batterieParametresData: BatterieParametres | null = null;
  isServerOnline: boolean | null = null;
  isLoading = true;
  faCircleInfo = faCircleInfo;

  constructor(
    private batterieParametresService: BatterieParametresService,
    private serveurService: ServeurService
  ){}



  ngOnInit(): void {

    // Vérification immédiate de l'état du serveur pour éviter l'état "null"
    this.serveurService.checkServerStatus().subscribe((status) => {
      this.isServerOnline = status;

      if (this.isServerOnline) {
        this.getBatterieParametresRealtime();
      } else {
        this.getLastBatterieParametresData();
      }
    });

    // Suivi des changements d'état du serveur pour les mises à jour continues
    this.serveurService.serverStatus$.subscribe((status) => {
      if (status !== this.isServerOnline) {
        this.isServerOnline = status;

        if (this.isServerOnline) {
          this.getBatterieParametresRealtime();
        } else {
          this.getLastBatterieParametresData();
        }
      }
    });

  }

  getBatterieParametresRealtime(){
    if(this.isServerOnline){
      this.batterieParametresService.getBatterieParametresData().subscribe({
        next: (data) => {
          this.batterieParametresData = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des paramètres de la batterie:', error);
          this.isLoading = false;
        },
      });
    }else{
      this.getLastBatterieParametresData();
    }
  }

  getLastBatterieParametresData(){
    if(!this.isServerOnline){
      this.batterieParametresService.getLastBatterieParametresData().subscribe({
        next: (data) => {
          this.batterieParametresData = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des derniers paramètres de la batterie', error);
          this.isLoading = false;
        },
      });
    }else{
      this.getBatterieParametresRealtime();
    }
  }

}
