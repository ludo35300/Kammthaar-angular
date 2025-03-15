import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serveurUrl = environment.apiUrl;
  private tokenKey = environment.token;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{  access_token: string, refresh_token: string }>(`${this.serveurUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access_token);  // Access token
        localStorage.setItem('refresh_token', response.refresh_token);  // Refresh token
        this.isLoggedInSubject.next(true);
      })
    );
  }
  refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.logout();  // Si le refresh token n'est pas disponible, déconnecte l'utilisateur
      return;
    }
  
    return this.http.post<{ access_token: string }>(`${this.serveurUrl}/refresh`, { refresh_token: refreshToken }).pipe(
      tap(response => {
        // Met à jour l'access token dans le localStorage
        localStorage.setItem(this.tokenKey, response.access_token);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // On envoie le token ici
    });
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.username || null;  // Vérifie si "username" est bien dans le token
    } catch (error) {
      console.error('Erreur de décodage du token', error);
      return null;
    }
  }
}



