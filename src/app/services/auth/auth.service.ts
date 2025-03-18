import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serveurUrl = environment.apiUrl;
  private authStatus = new BehaviorSubject<boolean>(false); // État global de connexion
  authStatus$ = this.authStatus.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  
  login(username: string, password: string) {
      return this.http.post(`${this.serveurUrl}/login`, { username, password }, { withCredentials: true })
        .subscribe({
          next: (response) => {
            this.authStatus.next(true);  // L'utilisateur est connecté
            this.router.navigate(['/dashboard']);  // Rediriger vers une page protégée
          },
          error: (err) => {
            this.authStatus.next(false);  // L'utilisateur n'est pas connecté
            console.error('Login failed', err);
          }
        });
  }

  // Méthode pour rafraîchir le token
  refreshToken(): Observable<any> {
    return this.http.post(`${this.serveurUrl}/refresh`, {}, { withCredentials: true }); 
  }

  
  logout() {
    this.http.post(`${this.serveurUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.authStatus.next(false);
      this.router.navigate(['/login']);
    });
  }

  checkAuthStatus(): void {
    this.http.get<{ authenticated: boolean }>(`${this.serveurUrl}/check_auth`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.authStatus.next(response.authenticated); // Met à jour l'état global
        },
        error: () => {
          this.authStatus.next(false); // En cas d'erreur, on considère l'utilisateur comme déconnecté
        }
      });
  }

  // Retourne un observable pour que les composants puissent écouter l’état d’authentification
  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
  getUserInfo(): Observable<any> {
    return this.http.get(`${this.serveurUrl}/user`, { withCredentials: true });
  }

  
}



