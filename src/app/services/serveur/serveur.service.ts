import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, interval, map, Observable, of, retry, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServeurService implements OnDestroy {

  private serveurUrl: string = environment.apiUrl;
  private serverStatus = new BehaviorSubject<boolean>(false); // État initial (false pour "déconnecté")
  public serverStatus$ = this.serverStatus.asObservable(); // Observable pour écouter l'état du serveur

  private errorMessage = new BehaviorSubject<string | null>(null); 
  errorMessage$ = this.errorMessage.asObservable();

  private destroy$ = new Subject<void>(); // Permet d'arrêter proprement l'interval
  public msgSucces: string = "";

  constructor(private http: HttpClient) {
    // Vérification régulière de l'état du serveur toutes les 60 secondes
    interval(60000).pipe(
      startWith(0),               // Lance immédiatement la première requête
      takeUntil(this.destroy$),   // Nettoyage de l'intervalle
      switchMap(() => this.checkServerStatus()) // Vérification du statut du serveur
    ).subscribe();
  }

 
  checkServerStatus(): Observable<boolean> {
    return this.http.get<{ message: string; status: boolean }>(`${this.serveurUrl}/serveur/status`)
      .pipe(
        map(response =>{
          const status = response.status ?? false; // Vérifie bien si "status" est défini
          this.serverStatus.next(status);
          return status; // Retourne la valeur du statut
        } ),
        catchError(err => {
          console.error("Erreur lors de la vérification du statut du Raspberry", err);
          return of(false);
        })
      );
  }

  /**
   * Récupère les informations système de Kammthaar (Du raspberry connecté au camion)
   * @returns Observable<any> des données système
   */
  getSystemInfo(): Observable<any> {
    return this.http.get(this.serveurUrl + '/serveur/infos', { withCredentials: true });
  }
  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete(); 
  }

}
