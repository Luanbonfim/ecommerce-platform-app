import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../app/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [LoginComponent, NgIf],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {

  isLoggedIn: boolean = false;
  isLoading: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    console.log('IS LOADING', this.isLoading);
    
    this.authService.isAuthenticated().subscribe({
      next: (loggedIn) => {
        console.log('CAIU NO SUBSCRIBE isLoggedIn', loggedIn);
        this.isLoggedIn = loggedIn; 
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Error checking login status', err);
        this.isLoading = false; 
      }
    });
  }
}
