import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolarData } from '../../modeles/solarData';

@Injectable({
  providedIn: 'root'
})
export class SolarDataService {
  private serveurUrl = environment.apiUrl
      
  constructor(private http: HttpClient) { }
  getSolarDataRealtime(): Observable<SolarData> {
    return this.http.get<SolarData>(this.serveurUrl+'/solarData/realtime');
  }
  getSolarDataLast(): Observable<SolarData> {
    return this.http.get<SolarData>(this.serveurUrl+'/solarData/last');
  }
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/solarData/last/24h/current")
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/solarData/last/24h/voltage")
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/solarData/last/24h/power")
  }
}
