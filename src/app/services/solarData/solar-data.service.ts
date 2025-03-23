import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, take } from 'rxjs';
import { SolarData } from '../../modeles/solarData';
import { ServeurService } from '../serveur/serveur.service';

@Injectable({
  providedIn: 'root'
})
export class SolarDataService {
  private serveurUrl = environment.apiUrl
      
  constructor(private http: HttpClient, private serveurService: ServeurService) { }
  
  getSolarDataRealtime(): Observable<SolarData | null> {
      this.serveurService.checkServerStatus();
      return this.serveurService.serverStatus$.pipe(
        take(1), // On prend seulement la dernière valeur connue de l'état du serveur
        switchMap((isOnline) => {
          if (isOnline) {
            return this.http.get<SolarData>(`${this.serveurUrl}/solarData/realtime`, { withCredentials: true });
          } else {
            return of(null); // Retourne `null` si le serveur est hors ligne
          }
        })
      );
    }
  getSolarDataLast(): Observable<SolarData | null> {
    return this.http.get<SolarData>(this.serveurUrl+'/solarData/last', { withCredentials: true }).pipe(
      catchError((error) => {
        return of(null);  // Retourner une valeur par défaut ou une valeur nulle pour éviter l'erreur dans l'interface
      })
    );
  };
  
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/solarData/last/24h/current", { withCredentials: true })
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/solarData/last/24h/voltage", { withCredentials: true })
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/solarData/last/24h/power", { withCredentials: true })
  }
}
