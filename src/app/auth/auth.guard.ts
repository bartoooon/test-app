import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root', // Registrata globalmente
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token'); // Controlla se c'è un token
    if (isLoggedIn) {
      return true; // Accesso consentito
    } else {
      this.router.navigate(['/auth/login']); // Reindirizza alla login
      return false;
    }
  }
}
