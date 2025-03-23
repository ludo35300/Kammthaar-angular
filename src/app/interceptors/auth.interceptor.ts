import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError, BehaviorSubject, filter, take, finalize } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false; // Flag pour indiquer si un rafraîchissement est en cours
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // On définit 'withCredentials: true' pour envoyer les cookies HTTP-Only avec chaque requête
    req = req.clone({
      withCredentials: true,  // Les cookies sont envoyés avec chaque requête
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Si le token est expiré (erreur 401), tenter de rafraîchir le token
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Si un rafraîchissement est déjà en cours, attendre sa complétion
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),  // Attendre que le refresh token soit disponible
        take(1),
        switchMap(() => {
          // Refaire la requête avec le nouveau token (les cookies sont gérés par le navigateur)
          return next.handle(req);
        })
      );
    } else {
      // Démarrer le rafraîchissement du token
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(true);
          // Refaire la requête après rafraîchissement
          return next.handle(req);
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout();  // Déconnexion si le rafraîchissement échoue
          this.router.navigate(['/login']);
          return throwError(() => error);
        })
      );
    }
  }
}