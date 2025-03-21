import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnergyStatistics } from '../../modeles/energyStatistics';

@Injectable({
  providedIn: 'root'
})
export class EnergyStatisticsService {
  private serveurUrl = environment.apiUrl
    
  constructor(private http: HttpClient) { }

  getEnergyStatisticsRealtime(): Observable<EnergyStatistics> {
    return this.http.get<EnergyStatistics>(this.serveurUrl+'/statistics/energy/realtime', { withCredentials: true });
  }
  getEnergyStatisticsLast(): Observable<EnergyStatistics> {
    return this.http.get<EnergyStatistics>(this.serveurUrl+'/statistics/energy/last', { withCredentials: true });
  }
  getEnergyStatisticsLast7days(): Observable<EnergyStatistics> {
        return this.http.get<EnergyStatistics>(this.serveurUrl+'/statistics/energy/7days', { withCredentials: true });
  }
}
