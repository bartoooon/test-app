import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { LoaderService } from '../components/loader/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth/login';
  private tokenKey = 'token';

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private snackBar: MatSnackBar
  ) {}

  public showSuccess(message: string): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: 1500,
      panelClass: ['success-snackbar'],
    });
  }

  public showError(message: string): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: 1500,
      panelClass: ['error-snackbar'],
    });
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    this.loaderService.show(); // Mostra lo spinner

    return this.http.post(this.apiUrl, body).pipe(
      map((response: any) => {
        console.log(response);
        if (response && response.accessToken) {
          this.setToken(response.accessToken, response.username); // Salva il token
        }
        return response;
      }),
      catchError((error) => {
        let errorMessage = 'Errore durante il login. Riprova.';
        if (error.status === 401 || error.error?.message) {
          errorMessage = 'Credenziali non valide. Riprova!';
        }

        // Mostra lo snackbar di errore
        this.showError(errorMessage);

        // Controlla se l'utente è presente nel localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(
          (u: any) => u.username === username && u.password === password
        );

        if (user) {
          // Utente trovato nel localStorage, simula un token
          const fakeToken = 'localstorage-token';
          this.setToken(fakeToken, user.username);
          return of({
            message: 'Login effettuato dal localStorage',
            user,
            token: fakeToken,
          });
        }

        // Se l'utente non esiste nemmeno nel localStorage, lancia l'errore
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => this.loaderService.hide()) // Nascondi lo spinner
    );
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

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: any) => u.username === username);

    if (userExists) {
      // Mostra lo snackBar se l'utente esiste già
      this.showError(`L'utente con username "${username}" esiste già.`);

      return throwError(
        () => new Error(`L'utente con username "${username}" esiste già.`)
      );
    }

    this.loaderService.show(); // Mostra lo spinner

    return this.http.post('https://dummyjson.com/users/add', body).pipe(
      map((response: any) => {
        users.push(response); // Aggiungi l'utente al localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Mostra il success snackBar
        this.showSuccess('Registrazione avvenuta con successo!');

        return response;
      }),
      catchError((error) => {
        // Gestisci l'errore specifico della registrazione
        if (error.message.includes('esiste già')) {
          return throwError(() => error);
        } else {
          // Altri errori generici
          console.error('Errore nella registrazione:', error);
          this.showError('Errore nella registrazione. Riprova.');

          return throwError(() => new Error('Registrazione fallita'));
        }
      }),
      finalize(() => this.loaderService.hide()) // Nascondi lo spinner
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

  private setToken(token: string, currentUser: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.showSuccess(`Ciao ${currentUser}!`);
      localStorage.setItem(this.tokenKey, token);
    }
  }

  private clearToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.showError(`Non sei più loggato :(`);
      localStorage.removeItem(this.tokenKey);
    }
  }
}
