import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../modeles/breadcrumb';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private serveurUrl = environment.apiUrl
        
  constructor(private http: HttpClient, private authService: AuthService) { }
  
  getBreadcrumbRealtime(): Observable<Breadcrumb> {
    return this.http.get<Breadcrumb>(this.serveurUrl+'/breadcrumb/realtime', { withCredentials: true });
  }
  getBreadcrumbLast(): Observable<Breadcrumb> {
    return this.http.get<Breadcrumb>(this.serveurUrl+'/breadcrumb/last', { withCredentials: true });
  }
}
