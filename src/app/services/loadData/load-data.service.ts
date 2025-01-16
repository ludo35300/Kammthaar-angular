import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadData } from '../../modeles/loadData';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {
  private serveurUrl = environment.apiUrl
        
  constructor(private http: HttpClient) { }
  getLoadDataRealtime(): Observable<LoadData> {
    return this.http.get<LoadData>(this.serveurUrl+'/loadData/realtime');
  }
  getLoadDataLast(): Observable<LoadData> {
    return this.http.get<LoadData>(this.serveurUrl+'/loadData/last');
  }
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/loadData/last/24h/current")
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/loadData/last/24h/voltage")
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/loadData/last/24h/power")
  }
}
