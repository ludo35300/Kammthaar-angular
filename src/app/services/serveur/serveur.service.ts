import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, interval, map, Observable, of, retry, startWith, Subject, switchMap, takeUntil } from 'rxjs';
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
    interval(10000).pipe(
      startWith(0),               // Lance immédiatement la première requête
      takeUntil(this.destroy$),   // Nettoyage de l'intervalle
      switchMap(() => this.checkServerStatus()) // Vérification du statut du serveur
    ).subscribe();
  }

  /**
   * Vérifie si le serveur est en ligne et met à jour l'état global
   * @returns Observable<boolean> représentant l'état du serveur
   */
  checkServerStatus(): Observable<boolean> {
    return this.http.get<{ status: boolean }>(`${this.serveurUrl}/serveur/status`).pipe(
      retry(3), // Réessaye jusqu'à 3 fois en cas d'échec
      map((response) => {
        const status = response.status;
        if (this.serverStatus.value !== status) { // Évite d'émettre si le statut est le même
          this.serverStatus.next(status);
        }
        return status;
      }),
      catchError((error) => {
        let errorMessage = 'Erreur inconnue lors de la vérification du serveur';
        if (error.status === 0) {
          errorMessage = 'Erreur de réseau : impossible de résoudre le nom de domaine ou d\'accéder au serveur';
        } else if (error.status === 404) {
          errorMessage = 'Serveur introuvable (404)';
        } else if (error.status === 500) {
          errorMessage = 'Erreur interne du serveur (500)';
        } else if (error.message.includes('ECONNREFUSED')) {
          errorMessage = 'Connexion refusée au serveur';
        }
        this.errorMessage.next(`Erreur lors de la vérification du serveur: ${errorMessage}`);
        
        if (this.serverStatus.value !== false) {
          this.serverStatus.next(false); // Met à jour le statut du serveur à "déconnecté"
        }
        return of(false); // Retourne `false` en cas d'erreur
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
