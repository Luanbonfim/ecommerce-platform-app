import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../../../auth/components/login/login.component';
import { ProductsListComponent } from '../../../products/components/products-list/products-list.component';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-homepage',
  imports: [LoginComponent, NgIf, ProductsListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {

  isLoggedIn: boolean = false;
  isLoading: boolean = true;
  currentUser: User | null = null;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.isLoading = true;
    
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
  });

    this.authService.isAuthenticated().subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn; 
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Error checking login status', err);
        this.isLoading = false; 
      }
    });

    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }
}
