import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, interval, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServeurService {

  private serveurUrl = environment.apiUrl
  private serverStatus = new BehaviorSubject<boolean | null>(null); // État initial
   // Observable pour écouter l'état
  serverStatus$ = this.serverStatus.asObservable();
  
  constructor(private http: HttpClient){
    // On vérifie toutes les 30 secondes
    interval(30000).subscribe(() => {
      this.checkServerStatus().subscribe((status) => {
        this.serverStatus.next(status);
      });
    });
  }

  /**
   * Vérifie si le serveur est en ligne et met à jour l'état global
   * @returns Observable<boolean> représentant l'état du serveur
   */
  checkServerStatus(): Observable<boolean> {
    return this.http.get(`${this.serveurUrl}/server/status`).pipe(
      map(() => {
        this.serverStatus.next(true);
        return true;
      }),
      catchError((err) => {
        this.serverStatus.next(false);
        return of(false);
      })
    );
    
  }
  /**
   * Récupère les informations système du serveur
   * @returns Observable<any> des données système
   */
  getSystemInfo(): Observable<any> {
    return this.http.get(this.serveurUrl+'/server/infos_server');
  }

}
