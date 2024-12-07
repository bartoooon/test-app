import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  username = '';
  password = '';
  email = '';
  age: number | null = null;
  gender = 'male';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onRegister() {
    if (
      this.firstName &&
      this.lastName &&
      this.username &&
      this.password &&
      this.email &&
      this.age
    ) {
      this.authService
        .register(
          this.firstName,
          this.lastName,
          this.username,
          this.password,
          this.email,
          this.age,
          this.gender
        )
        .subscribe(
          (response) => {
            this.router.navigate(['/auth/login']);
            console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      this.authService.showError('Per favore, compila tutti i campi.');
    }
  }
}
