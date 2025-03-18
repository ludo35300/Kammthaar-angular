import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideRouter([]),
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is authenticated', (done) => {
    authServiceSpy.isAuthenticated.and.returnValue(of(true));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should deny access and redirect if user is not authenticated', (done) => {
    authServiceSpy.isAuthenticated.and.returnValue(of(false));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
