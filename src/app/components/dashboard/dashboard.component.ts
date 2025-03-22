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
  
  energyStatistics7days$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  energyStatistics$: BehaviorSubject<EnergyStatistics | null> = new BehaviorSubject<EnergyStatistics | null>(null);
  
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
    this.getEnergyStatisticsLast7days();

    this.serveurService.serverStatus$.subscribe(status => {
      this.isServerOnline = status;
    });
  }



  // On récupère les dernières données du controller enregistrées
    getEnergyStatisticsLast7days() {
      this.energyStatisticsService.getEnergyStatisticsLast7days().subscribe({
        next: (data) => {
          this.energyStatistics7days$.next(data); // Mise à jour via BehaviorSubject
        }
      });
    }
}