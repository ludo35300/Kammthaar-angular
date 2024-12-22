import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ps } from '../../modeles/ps';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PsService {

  private serveurUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getPsData(): Observable<Ps> {
    return this.http.get<Ps>(this.serveurUrl+"/ps/realtime");
  }
  getLastPsData(): Observable<Ps> {
    return this.http.get<Ps>(this.serveurUrl+"/ps/last_ps_data");
  }

  getAmperageData24H(): Observable<any> {
    return this.http.get<Ps>(this.serveurUrl+"/ps/last24hAmperage");
  }
  getVoltageData24H(): Observable<any> {
    return this.http.get<Ps>(this.serveurUrl+"/ps/last24hVoltage");
  }
  getPowerData24H(): Observable<any> {
    return this.http.get<Ps>(this.serveurUrl+"/ps/last24hPower");
  }



}
