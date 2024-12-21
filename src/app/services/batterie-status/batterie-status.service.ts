import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BatterieParametres } from '../../modeles/batterie_parametres';
import { BatterieStatus } from '../../modeles/batterie-status';

@Injectable({
  providedIn: 'root'
})
export class BatterieStatusService {
  private serveurUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getBatterieStatusData(): Observable<BatterieStatus> {
    return this.http.get<BatterieStatus>(this.serveurUrl+'/batterie/status_realtime');
  }

  getLastBatterieStatusData(): Observable<BatterieStatus> {
    return this.http.get<BatterieStatus>(this.serveurUrl+'/batterie/last_status_data');
  }
}
