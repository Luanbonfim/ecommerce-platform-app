import { Component } from '@angular/core';
import { RouterOutlet, Router} from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}
  

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    });
  }

  logout(){
    this.authService.logout();
  }
}
