import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(): void {
    if (!this.username || !this.password) {
      // Se i campi non sono compilati, mostra uno snackBar
      this.authService.showError('Per favore, compila tutti i campi.');
      return;
    }
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.accessToken); // Salva il token
        this.router.navigate(['/products/products-list']); // Reindirizza
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Username o password non validi!';
      },
    });
  }
}
