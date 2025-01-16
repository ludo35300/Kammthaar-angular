import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DischargingEquipmentStatus } from '../../modeles/dischargingEquipmentStatus';

@Injectable({
  providedIn: 'root'
})
export class DischargingEquipmentStatusService {
  private serveurUrl = environment.apiUrl
    
  constructor(private http: HttpClient) { }
    
  getRealtime(): Observable<DischargingEquipmentStatus> {
    return this.http.get<DischargingEquipmentStatus>(this.serveurUrl+'/discharging/realtime');
  }
  getLast(): Observable<DischargingEquipmentStatus> {
    return this.http.get<DischargingEquipmentStatus>(this.serveurUrl+'/discharging/last');
  }
}
