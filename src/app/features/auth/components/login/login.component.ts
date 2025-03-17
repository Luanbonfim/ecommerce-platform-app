import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[ReactiveFormsModule, NgIf]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  signUpInvalid = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password, firstName, lastName} = this.loginForm.value;
    const user = { email, password, firstName, lastName};

    this.authService.login(user).subscribe({
      next: () => {
        // Redirect to home page on successful login
        this.router.navigate(['/']).then(() => { window.location.reload();});
      },
      error: (error: any) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login failed:', error);
      },
    });
  }

  onSignUp():void{
    const { email, password, firstName, lastName } = this.loginForm.value;
    const user = { email, password, firstName, lastName};
    this.authService.signup(user).subscribe({
      next: () => {
        // Redirect to home page on successful login
        this.router.navigate(['/']);  
      },
      error: (error: any) => {
        this.errorMessage = error.error;
        this.signUpInvalid = true;
      },
    });
  }

  onGoogleOauthLogin(){
    this.authService.googleLogin();
  }
}