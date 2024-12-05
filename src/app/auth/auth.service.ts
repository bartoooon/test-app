import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth/login'; // Endpoint API di DummyJSON
  private tokenKey = 'token'; // Chiave per il token nel localStorage

  constructor(private http: HttpClient) {}

  // Metodo per effettuare il login
  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post(this.apiUrl, body).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.setToken(response.token); // Salva il token
        }
        return response; // Restituisce la risposta completa
      }),
      catchError(this.handleError) // Gestione errori
    );
  }

  // Metodo per gestire il logout
  logout(): void {
    this.clearToken(); // Rimuove il token dal localStorage
    // Eventuali altre azioni per il logout (es. reindirizzamento)
  }

  // Metodo per controllare se l'utente è loggato
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Ottieni il token
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Salva il token
  private setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Rimuovi il token
  private clearToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  // Gestione errori HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Si è verificato un errore';
    if (error.error instanceof ErrorEvent) {
      // Errore client
      errorMessage = `Errore: ${error.error.message}`;
    } else {
      // Errore server
      errorMessage = `Errore Server: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage); // Log dell'errore
    return throwError(() => new Error(errorMessage));
  }
}
