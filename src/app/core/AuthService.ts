import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  private userDataKey = 'user_data';

  constructor(private router: Router) {}

  loginWithDiscord() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/discord';
  }

  handleLoginResponse(response: any) {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userDataKey, JSON.stringify(response.user));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userDataKey);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const raw = localStorage.getItem(this.userDataKey);
    return raw ? JSON.parse(raw) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
