import { Component, Input } from '@angular/core';
import { faClock, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, distinctUntilChanged, interval, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { Breadcrumb } from '../../modeles/breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ServeurService } from '../../services/serveur/serveur.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() title!: string;
  breadcrumbData$: BehaviorSubject<Breadcrumb | null> = new BehaviorSubject<Breadcrumb | null>(null);
  isServerOnline: boolean = false;
  private serverStatusSubscription: Subscription | null = null;
    private dataIntervalSubscription: Subscription | null = null;
  
  
  faSun = faSun;
  faMoon = faMoon;
  faClock = faClock;
  isLoading = true;

  constructor(
        private breadcrumbService: BreadcrumbService,
        private serveurService: ServeurService,
        public authService: AuthService
  ){}
      

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      // on charge les données hors ligne pour eviter le temps d'attente
      this.getBreadcrumbLast();
      this.serverStatusSubscription = this.serveurService.serverStatus$.subscribe(status => {
        this.isServerOnline = status;
          if (this.isServerOnline) {
            this.getBreadcrumbRealtime(); // Pour récupérer les infos immédiatement 
            this.startRealTimeDataUpdate(); // Pour refresh les infos toutes les 30
          } else {
            this.getBreadcrumbLast();
            this.stopRealTimeDataUpdate();
          }
        });
      }
  }

  startRealTimeDataUpdate(): void {
          if (!this.dataIntervalSubscription) {
            this.dataIntervalSubscription = interval(30000) // Chaque 10 secondes
              .pipe(
                switchMap(() => this.breadcrumbService.getBreadcrumbRealtime()) // Récupère les données en temps réel
              )
              .subscribe({
                next: (data) => {
                  this.breadcrumbData$.next(data); // Mettre à jour via BehaviorSubject
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


   // Récupération des infos du breadcrumb en temps réel
   getBreadcrumbRealtime(){
    this.breadcrumbService.getBreadcrumbRealtime()
      .subscribe({
        next: (data) => {
          const currentData = this.breadcrumbData$.getValue(); // Récupère les données actuelles
          // Si les nouvelles données sont différentes des anciennes, on les met à jour
          if (currentData?.current_device_time !== data.current_device_time) {
            this.breadcrumbData$.next(data);
          }
          this.isLoading = false;
        }
      });
  }
  // On récupère les dernières données du breadcrumb enregistrées
  getBreadcrumbLast(){
    this.breadcrumbService.getBreadcrumbLast().subscribe({
      next: (data) => {
        this.breadcrumbData$.next(data);
        this.isLoading = false;
      }
    });
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
