import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.checkAuthStatus();
    this.authService.authStatus$.subscribe(
      (isAuthenticated) => {
        this.router.navigate(['/dashboard']);
      }
    );
  }

  login(): void {
    this.authService.login(this.username, this.password)
  }

  logout(): void {
    this.authService.logout();

  }
}
