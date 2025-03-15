import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../modeles/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private serveurUrl = environment.apiUrl
        
  constructor(private http: HttpClient) { }
  getBreadcrumbRealtime(): Observable<Breadcrumb> {
    return this.http.get<Breadcrumb>(this.serveurUrl+'/breadcrumb/realtime');
  }
  getBreadcrumbLast(): Observable<Breadcrumb> {
    return this.http.get<Breadcrumb>(this.serveurUrl+'/breadcrumb/last');
  }
}
