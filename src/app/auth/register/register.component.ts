import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

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
            alert('Registrazione completata con successo!');
            this.router.navigate(['/auth/login']);
            console.log(response);
          },
          (error) => {
            alert('Errore nella registrazione.');
            console.error(error);
          }
        );
    } else {
      alert('Per favore, compila tutti i campi.');
    }
  }
}
