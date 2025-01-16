import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyStatistics } from '../../modeles/dailyStatistics';

@Injectable({
  providedIn: 'root'
})
export class DailyStatisticsService {
  private serveurUrl = environment.apiUrl
  
  constructor(private http: HttpClient) { }
  
  getDailyStatisticsRealtime(): Observable<DailyStatistics> {
    return this.http.get<DailyStatistics>(this.serveurUrl+'/statistics/daily/realtime');
  }
  getDailyStatisticsLast(): Observable<DailyStatistics> {
      return this.http.get<DailyStatistics>(this.serveurUrl+'/statistics/daily/last');
  }
}
