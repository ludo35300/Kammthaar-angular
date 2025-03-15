import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BatteryStatus } from '../../modeles/batteryStatus';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BatteryStatusService {
  private serveurUrl = environment.apiUrl
          
  constructor(private http: HttpClient, private authService: AuthService) { }

  getBatteryStatusRealtime(): Observable<BatteryStatus> {
    return this.http.get<BatteryStatus>(this.serveurUrl+'/battery/realtime', { headers: this.authService.getAuthHeaders() });
  }
  getBatteryStatusLast(): Observable<BatteryStatus> {
    return this.http.get<BatteryStatus>(this.serveurUrl+'/battery/last', { headers: this.authService.getAuthHeaders() });
  }
  getPourcent24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/state_of_charge", { headers: this.authService.getAuthHeaders() });
  }
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/current", { headers: this.authService.getAuthHeaders() });
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/voltage", { headers: this.authService.getAuthHeaders() });
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/power", { headers: this.authService.getAuthHeaders() });
  }
  getTemp24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/temperature", { headers: this.authService.getAuthHeaders() });
  }
}
