import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargingEquipmentStatus } from '../../modeles/chargingEquipmentStatus';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChargingEquipmentStatusService {
  private serveurUrl = environment.apiUrl
    
  constructor(private http: HttpClient, private authService: AuthService) { }
    
  getRealtime(): Observable<ChargingEquipmentStatus> {
    return this.http.get<ChargingEquipmentStatus>(this.serveurUrl+'/charging/realtime', { headers: this.authService.getAuthHeaders() });
  }
  getLast(): Observable<ChargingEquipmentStatus> {
    return this.http.get<ChargingEquipmentStatus>(this.serveurUrl+'/charging/last', { headers: this.authService.getAuthHeaders() });
  }
}