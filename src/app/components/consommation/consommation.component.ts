import { Component } from '@angular/core';
import { faSun, faMoon, faDumpster, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, concatMap, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { Controller } from '../../modeles/controller';
import { ServeurService } from '../../services/serveur/serveur.service';
import { DailyStatistics } from '../../modeles/dailyStatistics';
import { LoadData } from '../../modeles/loadData';
import { LoadDataService } from '../../services/loadData/load-data.service';

@Component({
  selector: 'app-consommation',
  templateUrl: './consommation.component.html',
  styleUrl: './consommation.component.scss'
})
export class ConsommationComponent {
  controllerData$: BehaviorSubject<Controller | null> = new BehaviorSubject<Controller | null>(null);
  dailyStatistics$: BehaviorSubject<DailyStatistics | null> = new BehaviorSubject<DailyStatistics | null>(null);
  // combinedData$!: Observable<{ controllerData: Controller | null; dailyStatistics: DailyStatistics | null }>;   // Observable combiné

  loadData$: BehaviorSubject<LoadData | null> = new BehaviorSubject<LoadData | null>(null);
  
  isServerOnline: boolean = false;
  selectedLabel: string | null = "Puissance";
  
    isLoading = true;
  
    faSun = faSun 
    faMoon = faMoon
    faDumpster = faDumpster
    faArrowRight = faArrowRight
    
    constructor(
      private serveurService: ServeurService,
      private loadDataService: LoadDataService,
    ){}
    
    ngOnInit(): void {
      // on charge les données hors ligne pour eviter le temps d'attente
      this.getLoadDataLast();
  
      this.serveurService.checkServerStatus()
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
        () => this.getLoadDataRealtime()
      ];
    
      realtimeRequests.reduce((chain, request) => {
          return chain.pipe(
            concatMap(async () => request()), // Exécuter chaque requête séquentiellement
            concatMap(() => timer(1000)) // Ajouter une pause de 1 seconde
          );
        }, timer(0)).subscribe();
      }
    
   
    getLoadDataRealtime(): Observable<LoadData> {
      return this.loadDataService.getLoadDataRealtime().pipe(
        map((data) => {
          this.loadData$.next(data); // Mettre à jour via BehaviorSubject
          this.isLoading = false;
          return data;
        })
      );
    }
    
    // On récupère les dernières données du controller enregistrées
    getLoadDataLast() {
      this.loadDataService.getLoadDataLast().subscribe({
        next: (data) => {
          this.loadData$.next(data); // Mise à jour via BehaviorSubject
          this.isLoading = false;
        }
      });
    }
  
    onLabelSelected(label: string) {
      this.selectedLabel = label; // Mettre à jour le label pour transmettre au graphique
    }
}
