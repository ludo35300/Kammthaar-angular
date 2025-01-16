import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Controller } from '../../modeles/controller';

@Injectable({
  providedIn: 'root'
})
export class ControllerDataService {
  private serveurUrl = environment.apiUrl
        
  constructor(private http: HttpClient) { }
  getControllerDataRealtime(): Observable<Controller> {
    return this.http.get<Controller>(this.serveurUrl+'/controller/realtime');
  }
  getControllerDataLast(): Observable<Controller> {
    return this.http.get<Controller>(this.serveurUrl+'/controller/last');
  }
}
