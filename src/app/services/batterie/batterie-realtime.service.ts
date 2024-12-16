import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Batterie } from '../../modeles/batterie';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatterieRealtimeService {

  private serveurUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getBatterieData(): Observable<Batterie> {
    return this.http.get<Batterie>(this.serveurUrl+"/batterie/batterie_realtime");
  }

  getLastBatterieData(): Observable<Batterie> {
    return this.http.get<Batterie>(this.serveurUrl+'/batterie/last_batterie_data');
  }

  getPourcent24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/batterie/last24hPourcent")
  }
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/batterie/last24hAmperage")
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/batterie/last24hVoltage")
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/batterie/last24hPower")
  }
  getTemp24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/batterie/last24hTemp")
  }

  
  
}
