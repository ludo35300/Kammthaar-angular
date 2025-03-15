import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Si un token existe, on l'ajoute à la requête
    if (token) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    // Passer la requête au handler
    return next.handle(req).pipe(
      switchMap((event: HttpEvent<any>) => {
        // Si la réponse est un 401, tenter de rafraîchir le token
        if (event instanceof HttpErrorResponse && event.status === 401) {
          // On tente de rafraîchir le token
          const refreshToken$ = this.authService.refreshAccessToken();

          if (refreshToken$) {
            return refreshToken$.pipe(
              switchMap(() => {
                const newToken = this.authService.getToken();
                if (newToken) {
                  // Si un nouveau token est récupéré, réessayer la requête
                  const clonedRequest = req.clone({
                    setHeaders: {
                      'Authorization': `Bearer ${newToken}`
                    }
                  });
                  return next.handle(clonedRequest);  // Réessayer avec le nouveau token
                } else {
                  // Si on ne peut pas obtenir un nouveau token, déconnecter l'utilisateur
                  this.authService.logout();
                  return throwError('Token invalid or expired, user logged out');
                }
              })
            );
          }
        }
        // Si la réponse n'est pas une erreur 401, renvoyer directement la réponse
        return of(event);
      })
    );
  }
}
