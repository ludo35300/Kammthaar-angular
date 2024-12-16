import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ps } from '../modeles/ps';

@Injectable({
  providedIn: 'root'
})
export class PsService {

  private apiUrl = 'http://127.0.0.1:5000/ps'; // URL de l'API Flask
  private serveurUrl = 'http://127.0.0.1:8080'; // URL de l'api si Kammthar hors ligne

  constructor(private http: HttpClient) { }

  getPsData(): Observable<Ps> {
    return this.http.get<Ps>(this.apiUrl+"/realtime");
  }
  getLastPsData(): Observable<Ps> {
    return this.http.get<Ps>(this.serveurUrl+"/ps/last_ps_data");
  }



  
  getAmperageData24H(): Observable<any> {
    return this.http.get<Ps>(this.apiUrl+"/amperage/last6h");
  }
  getVoltageData24H(): Observable<any> {
    return this.http.get<Ps>(this.apiUrl+"/voltage/last6h");
  }
  getPowerData24H(): Observable<any> {
    return this.http.get<Ps>(this.apiUrl+"/power/last6h");
  }


}
