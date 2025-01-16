import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BatteryStatus } from '../../modeles/batteryStatus';

@Injectable({
  providedIn: 'root'
})
export class BatteryStatusService {
  private serveurUrl = environment.apiUrl
          
  constructor(private http: HttpClient) { }

  getBatteryStatusRealtime(): Observable<BatteryStatus> {
    return this.http.get<BatteryStatus>(this.serveurUrl+'/battery/realtime');
  }
  getBatteryStatusLast(): Observable<BatteryStatus> {
    return this.http.get<BatteryStatus>(this.serveurUrl+'/battery/last');
  }
  getPourcent24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/state_of_charge")
  }
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/current")
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/voltage")
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/power")
  }
  getTemp24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/battery/last/24h/temperature")
  }
}
