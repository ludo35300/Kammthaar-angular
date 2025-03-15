import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolarData } from '../../modeles/solarData';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SolarDataService {
  private serveurUrl = environment.apiUrl
      
  constructor(private http: HttpClient, private authService: AuthService) { }
  getSolarDataRealtime(): Observable<SolarData> {
    return this.http.get<SolarData>(this.serveurUrl+'/solarData/realtime', { headers: this.authService.getAuthHeaders() });
  }
  getSolarDataLast(): Observable<SolarData> {
    return this.http.get<SolarData>(this.serveurUrl+'/solarData/last', { headers: this.authService.getAuthHeaders() });
  }
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/solarData/last/24h/current", { headers: this.authService.getAuthHeaders() })
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/solarData/last/24h/voltage", { headers: this.authService.getAuthHeaders() })
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/solarData/last/24h/power", { headers: this.authService.getAuthHeaders() })
  }
}
