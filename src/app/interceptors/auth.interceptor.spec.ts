import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        Router,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should send cookies with requests', () => {
    // Simule une requête HTTP
    httpClient.get('/test-url').subscribe(response => {
      expect(response).toEqual({ data: 'test' });
    });

    const req = httpTestingController.expectOne('/test-url');

    // Vérifie que les cookies sont inclus dans les en-têtes
    expect(req.request.withCredentials).toBeTrue();

    req.flush({ data: 'test' });
  });

  it('should handle 401 and redirect to login', () => {
    // Mock de la méthode du service d'authentification pour simuler un échec
    spyOn(authService, 'isAuthenticated').and.returnValue(of(true));

    spyOn(router, 'navigate');

    // Simuler une requête HTTP qui retourne un code 401 (Unauthorized)
    httpClient.get('/test-url').subscribe({
      next: () => fail('should have failed with a 401'),
      error: (error) => {
        expect(error instanceof HttpErrorResponse).toBeTruthy();
        expect(error.status).toBe(401);
      }
    });

    const req = httpTestingController.expectOne('/test-url');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    // Vérifie si la redirection vers la page de login est effectuée
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  afterEach(() => {
    // Vérifie qu'il n'y a pas de requêtes HTTP non capturées
    httpTestingController.verify();
  });
});
