import { Component, Input } from '@angular/core';
import { faClock, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Breadcrumb } from '../../modeles/breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { ServeurService } from '../../services/serveur/serveur.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() title!: string;
  breadcrumbData$: BehaviorSubject<Breadcrumb | null> = new BehaviorSubject<Breadcrumb | null>(null);
  isServerOnline: boolean = false;
  private destroy$ = new Subject<void>();
  
  
  faSun = faSun;
  faMoon = faMoon;
  faClock = faClock;
  isLoading = true;

  constructor(
        private breadcrumbService: BreadcrumbService,
        private serveurService: ServeurService
  ){}
      

  ngOnInit(): void {
    // on charge les données hors ligne pour eviter le temps d'attente
    this.getBreadcrumbLast();
    this.serveurService.checkServerStatus()
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$)) // Évite les redondances si le statut ne change pas
      .subscribe((status) => {
        this.isServerOnline = status;
        if (this.isServerOnline) {
          this.getBreadcrumbRealtime();
        } else {
          this.getBreadcrumbLast();
        }
      });
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
