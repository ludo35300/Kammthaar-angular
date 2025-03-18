import { Component } from '@angular/core';
import { faSun, faMoon, faDumpster, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, distinctUntilChanged, interval, Subscription, switchMap } from 'rxjs';
import { ServeurService } from '../../services/serveur/serveur.service';
import { LoadData } from '../../modeles/loadData';
import { LoadDataService } from '../../services/loadData/load-data.service';

@Component({
  selector: 'app-consommation',
  templateUrl: './consommation.component.html',
  styleUrl: './consommation.component.scss'
})
export class ConsommationComponent {
  loadData$: BehaviorSubject<LoadData | null> = new BehaviorSubject<LoadData | null>(null);
  private serverStatusSubscription: Subscription | null = null;
  private dataIntervalSubscription: Subscription | null = null;

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

  
      this.serveurService.getServerStatus()
        .pipe(distinctUntilChanged()) // Évite les redondances si le statut ne change pas
        .subscribe((status) => {
          this.isServerOnline = status;
          if (this.isServerOnline) {
            this.startRealTimeDataUpdate();
          } else {
            this.getLoadDataLast();
            this.stopRealTimeDataUpdate();
          }
        });
    }
    
    // Fonction pour obtenir les données en temps réel et les mettre à jour toutes les 10 secondes
      startRealTimeDataUpdate(): void {
        if (!this.dataIntervalSubscription) {
          this.dataIntervalSubscription = interval(10000) // Chaque 10 secondes
            .pipe(
              switchMap(() => this.loadDataService.getLoadDataRealtime()) // Récupère les données en temps réel
            )
            .subscribe({
              next: (data) => {
                this.loadData$.next(data); // Mettre à jour via BehaviorSubject
              },
              error: (err) => {
                console.error("Erreur lors de la récupération des données en temps réel", err);
              }
            });
        }
      }
    
      // Fonction pour arrêter la mise à jour des données en temps réel
      stopRealTimeDataUpdate(): void {
        if (this.dataIntervalSubscription) {
          this.dataIntervalSubscription.unsubscribe();
          this.dataIntervalSubscription = null;
        }
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
    
    ngOnDestroy(): void {
      // Nettoyage des abonnements
      if (this.serverStatusSubscription) {
        this.serverStatusSubscription.unsubscribe();
      }
      if (this.dataIntervalSubscription) {
        this.dataIntervalSubscription.unsubscribe();
      }
    }
}
