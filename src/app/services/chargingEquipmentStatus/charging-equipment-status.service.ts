import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargingEquipmentStatus } from '../../modeles/chargingEquipmentStatus';

@Injectable({
  providedIn: 'root'
})
export class ChargingEquipmentStatusService {
  private serveurUrl = environment.apiUrl
    
  constructor(private http: HttpClient) { }
    
  getRealtime(): Observable<ChargingEquipmentStatus> {
    return this.http.get<ChargingEquipmentStatus>(this.serveurUrl+'/charging/realtime');
  }
  getLast(): Observable<ChargingEquipmentStatus> {
    return this.http.get<ChargingEquipmentStatus>(this.serveurUrl+'/charging/last');
  }
}