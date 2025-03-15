import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnergyStatistics } from '../../modeles/energyStatistics';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnergyStatisticsService {
  private serveurUrl = environment.apiUrl
    
  constructor(private http: HttpClient, private authService: AuthService) { }
  getEnergyStatisticsRealtime(): Observable<EnergyStatistics> {
      return this.http.get<EnergyStatistics>(this.serveurUrl+'/statistics/energy/realtime', { headers: this.authService.getAuthHeaders() });
  }
  getEnergyStatisticsLast(): Observable<EnergyStatistics> {
        return this.http.get<EnergyStatistics>(this.serveurUrl+'/statistics/energy/last', { headers: this.authService.getAuthHeaders() });
  }
}
