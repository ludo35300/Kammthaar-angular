import { Component } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { ControllerService } from '../../services/controller/controller.service';
import { ServeurService } from '../../services/serveur/serveur.service';
import { Controller } from '../../modeles/controller';
import { BatterieParametres } from '../../modeles/batterie_parametres';
import { BatterieParametresService } from '../../services/batterie-parametres/batterie-parametres.service';

@Component({
  selector: 'app-batterie-parametres',
  templateUrl: './batterie-parametres.component.html',
  styleUrl: './batterie-parametres.component.scss'
})
export class BatterieParametresComponent {
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  batterieParametresData$: BehaviorSubject<BatterieParametres | null> = new BehaviorSubject<BatterieParametres | null>(null);

  isServerOnline: boolean | null = null;
  isLoading: boolean = true;

  controllerData: Controller | null = null;

  constructor(
      private serveurService: ServeurService,
      private controllerService: ControllerService,
      private batterieParametresService: BatterieParametresService
    ){}

    ngOnInit(): void {
      this.serveurService.checkServerStatus()
        .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
        .subscribe((status) => {
          this.isServerOnline = status;
          if (this.isServerOnline) {
            this.getControllerRealtime();
            this.controllerData$.subscribe((data) => {
              if (data) {
                setTimeout(() => {  // Pause de 1 seconde avant d'exécuter getStatistiquesRealtime
                  this.getBatterieParametresRealtime()
                }, 1000);
              }
            });
          }else {
              this.getLastControllerData();
              this.getLastBatterieParametresData();  
          }
        });
    }
  
    // Récupération des infos du controller pour récupére la date
  getControllerRealtime(){
    this.controllerService.getControllerRealtime().subscribe({
      next: (data) => {
        this.controllerData$.next(data);
        this.isLoading = false;
      }
    });
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastControllerData(){
    this.controllerService.getLastController().subscribe({
      next: (data) => {
        this.controllerData$.next(data);
        this.isLoading = false;
      }
    });
  }

    // Récupération des infos de la batterie (date, jour/nuit) en temps réel
  getBatterieParametresRealtime(){
    this.batterieParametresService.getBatterieParametresData().subscribe({
      next: (data) => {
        this.batterieParametresData$.next(data);
      },
    });
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastBatterieParametresData(){
    this.batterieParametresService.getLastBatterieParametresData().subscribe({
      next: (data) => {
        this.batterieParametresData$.next(data);
      },
    });
  }

}
