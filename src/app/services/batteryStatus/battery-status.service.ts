import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BatteryStatus } from '../../modeles/batteryStatus';

@Injectable({
  providedIn: 'root'
})
export class BatteryStatusService {
  private serveurUrl = environment.apiUrl
          
  constructor(private http: HttpClient) { }

  getBatteryStatusRealtime(): Observable<BatteryStatus | null> {
    return this.http.get<BatteryStatus>(`${this.serveurUrl}/battery/realtime`, { withCredentials: true });
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
