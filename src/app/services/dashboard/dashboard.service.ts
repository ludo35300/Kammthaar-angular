import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistiques } from '../../modeles/statistiques';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private serveurUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getStatistiquesRealtimeData(): Observable<Statistiques> {
    return this.http.get<Statistiques>(this.serveurUrl+'/statistiques/realtime');
  }

  getLastStatistiques(): Observable<Statistiques> {
    return this.http.get<Statistiques>(this.serveurUrl+'/statistiques/last');
  }
}
