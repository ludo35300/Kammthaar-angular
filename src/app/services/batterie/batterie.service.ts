import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Batterie } from '../../modeles/batterie';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatterieService {

  private serveurUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getBatterieData(): Observable<Batterie> {
    return this.http.get<Batterie>(this.serveurUrl+"/batterie/realtime");
  }
  getLastBatterieData(): Observable<Batterie> {
    return this.http.get<Batterie>(this.serveurUrl+'/batterie/last');
  }
  
  getPourcent24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/batterie/last/24h/battery_pourcent")
  }
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/batterie/last/24h/battery_amperage")
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/batterie/last/24h/battery_voltage")
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/batterie/last/24h/battery_power")
  }
  getTemp24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/batterie/last/24h/battery_temp")
  }
  
}
