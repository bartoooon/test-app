import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth/login';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    // ! questa butta cosa l'ho fatta solo perchè almeno da un minimo di sensazione di aver creato un'utenza vera 😅😅😅
    const users = JSON.parse(localStorage.getItem('users') || '[]'); // Recupera gli utenti dal localStorage
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    if (user) {
      const token = 'dummy-token'; // Genera un token fittizio
      localStorage.setItem('token', token);
      return of({ success: true, token }); // Simula una risposta di successo
    } else {
      return throwError(() => new Error('Credenziali non valide'));
    }
  }

  register(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    age: number,
    gender: string
  ): Observable<any> {
    const body = {
      firstName,
      lastName,
      username,
      password,
      email,
      age,
      gender,
    };

    return this.http.post('https://dummyjson.com/users/add', body).pipe(
      map((response: any) => {
        // ! questa butta cosa l'ho fatta solo perchè almeno da un minimo di sensazione di aver creato un'utenza vera 😅😅😅
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(response); // Aggiungi l'utente alla lista
        localStorage.setItem('users', JSON.stringify(users));
        return response; // Restituisci la risposta della chiamata
      }),
      catchError((error) => {
        console.error('Errore nella registrazione:', error);
        return throwError(() => new Error('Registrazione fallita'));
      })
    );
  }

  logout(): void {
    this.clearToken();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  private clearToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Si è verificato un errore';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Errore: ${error.error.message}`;
    } else {
      errorMessage = `Errore Server: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
