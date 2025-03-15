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

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBatterieParametresData(): Observable<BatterieParametres> {
    return this.http.get<BatterieParametres>(this.serveurUrl+'/battery/parameters/realtime', { headers: this.authService.getAuthHeaders() });
  }

  getLastBatterieParametresData(): Observable<BatterieParametres> {
    return this.http.get<BatterieParametres>(this.serveurUrl+'/battery/parameters/last', { headers: this.authService.getAuthHeaders() });
  }

}