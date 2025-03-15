import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { faCarBattery, faSun } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BatteryStatusService } from '../../services/batteryStatus/battery-status.service';
import { BatteryStatus } from '../../modeles/batteryStatus';


@Component({
  selector: 'app-batterie',
  templateUrl: './batterie.component.html',
  styleUrl: './batterie.component.scss'
})
export class BatterieComponent implements OnInit{
  batteryStatus$: BehaviorSubject<BatteryStatus | null> = new BehaviorSubject<BatteryStatus | null>(null);

  isServerOnline: boolean = false;
  isLoading: boolean = true;

  faCarBattery = faCarBattery;
  faSun = faSun;
  selectedLabel: string  = "Pourcentage";

  constructor(
    private serveurService: ServeurService,
    private batteryStatusService: BatteryStatusService
  ){}

  ngOnInit(): void {
    this.getBatterieStatusLast();

    this.serveurService.getServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.fetchRealtimeData();
        }
      });
  }

  // Requêtes en temps réel avec une pause de 1 seconde entre elles
  fetchRealtimeData() {
    const realtimeRequests = [
      () => this.getBatterieStatusRealtime(),
    ];
  
    realtimeRequests.reduce((chain, request) => {
      return chain.pipe(
        concatMap(() => request()), // Exécuter chaque requête séquentiellement
        concatMap(() => timer(1000)) // Ajouter une pause de 1 seconde
      );
    }, timer(0)).subscribe();
  }


  getBatterieStatusRealtime(): Observable<BatteryStatus> {
    return this.batteryStatusService.getBatteryStatusRealtime().pipe(
      map((data) => {
        this.batteryStatus$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }
  // On récupère les dernières données du controlleur enregistrées
  getBatterieStatusLast(){
    this.batteryStatusService.getBatteryStatusLast().subscribe({
      next: (data) => {
        this.batteryStatus$.next(data);
      },
    });
  }

  onLabelSelected(label: string) {
    this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
  }

}