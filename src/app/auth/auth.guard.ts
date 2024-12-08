import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root', // Registrata globalmente
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token) {
        return of(true); // Consenti l'accesso se il token è presente
      }
    }

    // In caso contrario, reindirizza o blocca l'accesso
    this.router.navigate(['/auth/login']);
    return of(false);
  }
}
