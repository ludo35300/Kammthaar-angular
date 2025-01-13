import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, interval, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServeurService {

  private serveurUrl = environment.apiUrl
  private serverStatus = new BehaviorSubject<boolean>(false); // État initial
   // Observable pour écouter l'état
  serverStatus$ = this.serverStatus.asObservable();
  
  constructor(private http: HttpClient){
    // On vérifie toutes les 60 secondes
    interval(60000).subscribe(() => {
      this.checkServerStatus().subscribe();
    });
  }

  getServerStatus(): Observable<boolean> {
    return this.serverStatus.asObservable();
  }

  /**
   * Vérifie si le serveur est en ligne et met à jour l'état global
   * @returns Observable<boolean> représentant l'état du serveur
   */
  checkServerStatus(): Observable<boolean> {
    return this.http.get<{ status: boolean }>(`${this.serveurUrl}/serveur/status`).pipe(
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
  /**
   * Récupère les informations système du serveur
   * @returns Observable<any> des données système
   */
  getSystemInfo(): Observable<any> {
    return this.http.get(this.serveurUrl+'/serveur/infos');
  }

}
