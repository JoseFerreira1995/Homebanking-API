import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  checkoutForm = this.formBuilder.group({
    name: '',
    email: '',
    password: '',
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    const { name, email, password } = this.checkoutForm.value;
    this.authService
      .register(name ?? '', email ?? '', password ?? '')
      .subscribe({
        next: (response) => {
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log('Failed to register', err);
        },
      });
  }
}
