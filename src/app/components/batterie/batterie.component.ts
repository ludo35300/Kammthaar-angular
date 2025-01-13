import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { faCarBattery, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { ControllerService } from '../../services/controller/controller.service';
import { BatterieService } from '../../services/batterie/batterie.service';
import { BatterieStatusService } from '../../services/batterie-status/batterie-status.service';
import { Controller } from '../../modeles/controller';
import { Batterie } from '../../modeles/batterie';
import { BatterieStatus } from '../../modeles/batterie-status';


@Component({
  selector: 'app-batterie',
  templateUrl: './batterie.component.html',
  styleUrl: './batterie.component.scss'
})
export class BatterieComponent implements OnInit{
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  batterieData$: BehaviorSubject<Batterie | null> = new BehaviorSubject<Batterie | null>(null);
  batterieStatusData$: BehaviorSubject<BatterieStatus | null> = new BehaviorSubject<BatterieStatus | null>(null);

  isServerOnline: boolean = false;
  isLoading: boolean = true;

  faCarBattery = faCarBattery;
  faSun = faSun;
  selectedLabel: string  = "Pourcentage";

  constructor(
    private serveurService: ServeurService,
    private controllerService: ControllerService,
    private batterieService: BatterieService,
    private batterieStatusService: BatterieStatusService
  ){}

  ngOnInit(): void {
    this.getLastControllerData();
    this.getLastBatterieData();
    this.getLastStatusData();
    
    this.serveurService.getServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.fetchRealtimeData();
        }else {
            this.getLastControllerData();
            this.getLastBatterieData(); 
            this.getLastStatusData();
        }
      });
  }

  // Requêtes en temps réel avec une pause de 1 seconde entre elles
    fetchRealtimeData() {
      const realtimeRequests = [
        () => this.getControllerRealtime(),
        () => this.getBatterieRealtime(),
        () => this.getStatusRealtime()
      ];
  
      realtimeRequests.reduce((chain, request) => {
        return chain.pipe(
          concatMap(() => request()), // Exécuter chaque requête séquentiellement
          concatMap(() => timer(1000)) // Ajouter une pause de 1 seconde
        );
      }, timer(0)).subscribe();
    }

  // Récupération des infos du controller pour récupére la date
  
  getControllerRealtime(): Observable<Controller> {
      return this.controllerService.getControllerRealtime().pipe(
        map((data) => {
          this.controllerData$.next(data); // Mettre à jour via BehaviorSubject
          this.isLoading = false;
          return data;
        })
      );
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

  getBatterieRealtime(): Observable<Batterie> {
    return this.batterieService.getBatterieData().pipe(
      map((data) => {
        this.batterieData$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastBatterieData(){
    this.batterieService.getLastBatterieData().subscribe({
      next: (data) => {
        this.batterieData$.next(data);
      },
    });
  }
  getStatusRealtime(): Observable<BatterieStatus> {
    return this.batterieStatusService.getBatterieStatusData().pipe(
      map((data) => {
        this.batterieStatusData$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }
  // On récupère les dernières données du controlleur enregistrées
  getLastStatusData(){
    this.batterieStatusService.getLastBatterieStatusData().subscribe({
      next: (data) => {
        this.batterieStatusData$.next(data);
      }
    });
  }

  onLabelSelected(label: string) {
    this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
  }

}