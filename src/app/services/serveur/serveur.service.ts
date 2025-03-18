import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, interval, map, Observable, of, retry, Subject, switchMap, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServeurService {

  private serveurUrl = environment.apiUrl
  private serverStatus = new BehaviorSubject<boolean>(false); // État initial
  private destroy$ = new Subject<void>(); // Permet d'arrêter proprement l'interval
  
  serverStatus$ = this.serverStatus.asObservable(); // Observable pour écouter l'état du serveur
  
  constructor(private http: HttpClient) {
    this.checkServerStatus().subscribe();
    interval(60000).pipe(
      takeUntil(this.destroy$), // Nettoyage de l'intervalle
      switchMap(() => this.checkServerStatus())
    ).subscribe();
    
  }
  /**
   * Vérifie si le serveur est en ligne et met à jour l'état global
   * @returns Observable<boolean> représentant l'état du serveur
   */
  checkServerStatus(): Observable<boolean> {
    return this.http.get<{ status: boolean }>(`${this.serveurUrl}/serveur/status`).pipe(
      retry(3), // Réessaye jusqu'à 3 fois
      map((response) => {
        const status = response.status;
        if (this.serverStatus.value !== status) { // Évite d'émettre si le statut est le même
          this.serverStatus.next(status);
        }
        return status;
      }),
      catchError(() => {
        if (this.serverStatus.value !== false) { // Évite d'émettre si déjà à `false`
          this.serverStatus.next(false);
        }
        return of(false);
      })
    );
  }

  getServerStatus(): Observable<boolean> {
    return this.serverStatus.asObservable();
  }
  /**
   * Récupère les informations système du serveur
   * @returns Observable<any> des données système
   */
  getSystemInfo(): Observable<any> {
    return this.http.get(this.serveurUrl+'/serveur/infos', { withCredentials: true });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete(); 
  }

}
