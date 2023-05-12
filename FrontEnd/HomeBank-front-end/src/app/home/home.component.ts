import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  navigateToRegister() {
    this.router.navigate(['register']);
  }

  onSubmit(): void {
    const { email = '', password } = this.loginForm.value;

    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Logged in successfully', response);
          this.router.navigate(['transactions']);
        },
        error: (err) => {
          return err;
        },
      });
    }
  }
}
export class InputErrorsExample {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
