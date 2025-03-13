import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { oauthConfig } from './oAuth/oauth.config';
import { apiConfig } from '../app.config';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private baseUrl = apiConfig.apiBaseUrl; // Replace with your API login endpoint
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient
    , private router: Router
    , private oauthService: OAuthService) {
    this.configureAuth();
    this.isAuthenticated().subscribe();
  }

  private configureAuth() {
    if (!this.oauthService) {
      console.error('OAuthService is not properly injected');
      return;
    }

    try {
      this.oauthService.configure(oauthConfig);
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          this.isLoggedInSubject.next(true);
        }
      });
    } catch (error) {
      console.error('Error configuring OAuth:', error);
    }
  }
  // Get current login state
  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // Method to log in
  login(user: User): Observable<any> {
    // Use `withCredentials: true` to allow cookies
    return this.http.post(this.baseUrl + apiConfig.endpoints.login, user, {
      withCredentials: true,
    })
  }

  googleLogin(): void {
    try {
      window.location.href = this.baseUrl + apiConfig.endpoints.googlelogin;
    } catch (error: unknown) {
      console.error('Error in googleLogin:', error);
    }
  }

  // Method to log out
  logout(): void {
    // Call your ASP.NET Core API's logout endpoint if needed
    this.http
      .post(this.baseUrl + apiConfig.endpoints.logout, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.oauthService.logOut();
          this.isLoggedInSubject.next(false);
          this.router.navigate(['/']).then(() => { window.location.reload(); });
        },
        error: (error) => {
          console.error('Logout failed:', error);
        },
      });
  }

  signup(user: User): Observable<any> {
    return this.http.post(this.baseUrl + apiConfig.endpoints.signup, user, {
      withCredentials: true,
    });
  }


  // Method to check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.http.get<any>(this.baseUrl + apiConfig.endpoints.checkauth, {
      withCredentials: true,
    }).pipe(
      map(() => {
        const isAuth = true;
        this.isLoggedInSubject.next(isAuth); // Update BehaviorSubject
        return isAuth; // Ensure boolean return
      }),
      catchError(() => {
        this.isLoggedInSubject.next(false);
        return of(false); // Return false on error
      })
    );
  }
}