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
    return this.http.get<Controller>(this.serveurUrl+'/controller/last_controller_data');
  }

  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/controller/last24hAmperage")
  }

  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/controller/last24hVoltage")
  }

  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/controller/last24hPower")
  }

  getTemperature24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/controller/last24hTemperature")
  }
  
}