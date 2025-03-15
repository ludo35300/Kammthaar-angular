import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadData } from '../../modeles/loadData';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {
  private serveurUrl = environment.apiUrl
        
  constructor(private http: HttpClient, private authService: AuthService) { }
  getLoadDataRealtime(): Observable<LoadData> {
    return this.http.get<LoadData>(this.serveurUrl+'/loadData/realtime', { headers: this.authService.getAuthHeaders() });
  }
  getLoadDataLast(): Observable<LoadData> {
    return this.http.get<LoadData>(this.serveurUrl+'/loadData/last', { headers: this.authService.getAuthHeaders() });
  }
  getAmperage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/loadData/last/24h/current", { headers: this.authService.getAuthHeaders() })
  }
  getVoltage24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/loadData/last/24h/voltage", { headers: this.authService.getAuthHeaders() })
  }
  getPower24h(): Observable<any>{
    return this.http.get<any>(this.serveurUrl+"/loadData/last/24h/power", { headers: this.authService.getAuthHeaders() })
  }
}
