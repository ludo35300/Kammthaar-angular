import { Component } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { ServeurService } from '../../services/serveur/serveur.service';
import { Controller } from '../../modeles/controller';
import { BatterieParametres } from '../../modeles/batteryParameters';
import { BatterieParametresService } from '../../services/batterie-parametres/batterie-parametres.service';

@Component({
  selector: 'app-batterie-parametres',
  templateUrl: './batterie-parametres.component.html',
  styleUrl: './batterie-parametres.component.scss'
})
export class BatterieParametresComponent {
  batterieParametresData$: BehaviorSubject<BatterieParametres | null> = new BehaviorSubject<BatterieParametres | null>(null);

  isServerOnline: boolean = false;
  isLoading: boolean = true;

  controllerData: Controller | null = null;

  constructor(
      private serveurService: ServeurService,
      private batterieParametresService: BatterieParametresService
  ){}

  ngOnInit(): void {
    this.getLastBatterieParametresData();
      
    this.serveurService.getServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.getBatterieParametresRealtime();
        }else {
            this.getLastBatterieParametresData();
        }
      });
  }
  
  getBatterieParametresRealtime(): Observable<BatterieParametres> {
    return this.batterieParametresService.getBatterieParametresData().pipe(
      map((data) => {
        this.batterieParametresData$.next(data); // Mettre à jour via BehaviorSubject
        return data;
      })
    );
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
