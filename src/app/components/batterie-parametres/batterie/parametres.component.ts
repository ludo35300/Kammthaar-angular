import { Component, Input, OnInit } from '@angular/core';
import { BatterieParametres } from '../../../modeles/batterie_parametres';
import { ServeurService } from '../../../services/serveur/serveur.service';
import { BatterieParametresService } from '../../../services/batterie-parametres/batterie-parametres.service';
import { faCircleInfo, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.scss'
})
export class ParametresComponent implements OnInit{
  batterieParametresData: BatterieParametres | null = null;
  @Input() isServerOnline: boolean | null = null;
  isLoading = true;
  faCircleInfo = faCircleInfo;
  faSun = faSun

  constructor(
    private batterieParametresService: BatterieParametresService,
    private serveurService: ServeurService
  ){}



  ngOnInit(): void {
    // Si Kammthaar est en ligne on récupère les informations en temps réel
    if(this.isServerOnline){
        this.getBatterieParametresRealtime();
    } else {
        this.getLastBatterieParametresData();
    }

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
