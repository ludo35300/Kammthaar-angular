import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, take } from 'rxjs';
import { BatteryStatus } from '../../modeles/batteryStatus';
import { ServeurService } from '../serveur/serveur.service';

@Injectable({
  providedIn: 'root'
})
export class BatteryStatusService {
  private serveurUrl = environment.apiUrl
          
  constructor(private http: HttpClient, private serveurService: ServeurService) { }

  getBatteryStatusRealtime(): Observable<BatteryStatus | null> {
    this.serveurService.checkServerStatus();
    return this.serveurService.serverStatus$.pipe(
      switchMap((isOnline) => {
        if (isOnline) {
          return this.http.get<BatteryStatus>(`${this.serveurUrl}/battery/realtime`, { withCredentials: true });
        } else {
          return of(null); // Retourne `null` si le serveur est hors ligne
        }
      })
    );
  }

  getBatteryStatusLast(): Observable<BatteryStatus> {
    return this.http.get<BatteryStatus>(this.serveurUrl+'/battery/last', { withCredentials: true });
  }
  getPourcent24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/state_of_charge", { withCredentials: true });
  }
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/current", { withCredentials: true });
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/voltage", { withCredentials: true });
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/power", { withCredentials: true });
  }
  getTemp24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/temperature", { withCredentials: true });
  }
}
