import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { BatterieParametres } from '../../modeles/batteryParameters';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { ServeurService } from '../serveur/serveur.service';

@Injectable({
  providedIn: 'root'
})
export class BatterieParametresService {
  private serveurUrl = environment.apiUrl

  constructor(private http: HttpClient, private serveurService: ServeurService) { }

  
  getBatterieParametresData(): Observable<BatterieParametres> {
    this.serveurService.checkServerStatus();
    return this.serveurService.serverStatus$.pipe(
      take(1),
      switchMap((isOnline) => {
        if (isOnline) {
          return this.http.get<BatterieParametres>(`${this.serveurUrl}/battery/parameters/realtime`, { withCredentials: true });
        } else {
          // Retourne un objet par défaut au lieu de null
          return of({} as BatterieParametres);
        }
      })
    );
  }

  getLastBatterieParametresData(): Observable<BatterieParametres> {
    return this.http.get<BatterieParametres>(this.serveurUrl+'/battery/parameters/last', { withCredentials: true });
  }

}