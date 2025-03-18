import { Component, OnInit } from '@angular/core';
import { faArrowRight, faChartLine, faCheck, faMoon, faSun, faWarning } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { Raspberry } from '../../modeles/server_infos';
import { EnergyStatisticsService } from '../../services/energyStatistics/energy-statistics.service';
import { EnergyStatistics } from '../../modeles/energyStatistics';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  isServerOnline: boolean = false;
  isLoading = true;

  energyStatistics$: BehaviorSubject<EnergyStatistics | null> = new BehaviorSubject<EnergyStatistics | null>(null);
  systemInfo$: BehaviorSubject<Raspberry | null> = new BehaviorSubject<Raspberry | null>(null);

  faWarning = faWarning
  faArrowRight = faArrowRight
  faSun = faSun
  faMoon = faMoon
  faChart = faChartLine
  faCheck = faCheck

  constructor(
    private serveurService: ServeurService,
    private energyStatisticsService: EnergyStatisticsService    
  ){}

  ngOnInit(): void {
    this.getEnergyStatisticsLast();

    this.serveurService.getServerStatus()
      .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.getInfosServeur();
          this.getEnergyStatisticsRealtime()
        } else {
          this.getEnergyStatisticsLast();
        }
      });
  }

  

  getEnergyStatisticsRealtime(): Observable<EnergyStatistics> {
    return this.energyStatisticsService.getEnergyStatisticsRealtime().pipe(
      map((data) => {
        this.energyStatistics$.next(data); // Mettre à jour via BehaviorSubject
        this.isLoading = false;
        return data;
      })
    );
  }

  // On récupère les dernières données du controller enregistrées
  getEnergyStatisticsLast() {
    this.energyStatisticsService.getEnergyStatisticsLast().subscribe({
      next: (data) => {
        this.energyStatistics$.next(data); // Mise à jour via BehaviorSubject
        this.isLoading = false;
      }
    });
  }
  //  On récupère les infos du serveur Kammthaar en temps réel
  getInfosServeur(){ 
    this.serveurService.getSystemInfo().subscribe({
      next: (data) => (this.systemInfo$.next(data))
    });
  }
}


