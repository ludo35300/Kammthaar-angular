import { Component, OnInit } from '@angular/core';
import { faArrowRight, faChartLine, faCheck, faMoon, faSun, faWarning } from '@fortawesome/free-solid-svg-icons';
import { ServeurService } from '../../services/serveur/serveur.service';
import { BehaviorSubject, distinctUntilChanged, interval, map, Observable, Subscription, switchMap } from 'rxjs';
import { Raspberry } from '../../modeles/server_infos';
import { EnergyStatisticsService } from '../../services/energyStatistics/energy-statistics.service';
import { EnergyStatistics } from '../../modeles/energyStatistics';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  isLoading = true;

  energyStatistics7days$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  energyStatistics$: BehaviorSubject<EnergyStatistics | null> = new BehaviorSubject<EnergyStatistics | null>(null);
  private dataIntervalSubscription: Subscription | null = null;
  messageErreur = "";

  isServerOnline: boolean = false;
  
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
    this.getEnergyStatisticsLast7days();

    this.serveurService.serverStatus$.subscribe(status => {
      this.isServerOnline = status;
        if (status) {
          this.startRealTimeDataUpdate()
        } else {
          this.getEnergyStatisticsLast();
        }
      });
  }

  startRealTimeDataUpdate(): void {
    if (!this.dataIntervalSubscription) {
      this.dataIntervalSubscription = interval(10000) // Chaque 10 secondes
        .pipe(
            switchMap(() => this.energyStatisticsService.getEnergyStatisticsRealtime()) // Récupère les données en temps réel
          )
          .subscribe({
            next: (data) => {
              this.energyStatistics$.next(data); // Mettre à jour via BehaviorSubject
            },
            error: (err) => {
              this.messageErreur = `Erreur lors de la récupération des statistiques:, ${err}`
            }
          });
    }
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

  // On récupère les dernières données du controller enregistrées
    getEnergyStatisticsLast7days() {
      this.energyStatisticsService.getEnergyStatisticsLast7days().subscribe({
        next: (data) => {
          this.energyStatistics7days$.next(data); // Mise à jour via BehaviorSubject
          this.isLoading = false;
        }
      });
  
    }
}