import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BatterieParametres } from '../../modeles/batteryParameters';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BatterieParametresService {
  private serveurUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getBatterieParametresData(): Observable<BatterieParametres> {
    return this.http.get<BatterieParametres>(this.serveurUrl+'/battery/parameters/realtime', { withCredentials: true });
  }

  getLastBatterieParametresData(): Observable<BatterieParametres> {
    return this.http.get<BatterieParametres>(this.serveurUrl+'/battery/parameters/last', { withCredentials: true });
  }

}