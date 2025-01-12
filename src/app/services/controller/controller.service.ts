import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Controller } from '../../modeles/controller';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private serveurUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getControllerRealtime(): Observable<Controller> {
    return this.http.get<Controller>(this.serveurUrl+'/controller/realtime');
  }
  getLastController(): Observable<Controller> {
    return this.http.get<Controller>(this.serveurUrl+'/controller/last');
  }
  
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/controller/last/24h/amperage")
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/controller/last/24h/voltage")
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/controller/last/24h/power")
  }
  getTemperature24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/controller/last/24h/temperature")
  }
  
}