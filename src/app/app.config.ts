import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient()
  ]
};

export const apiConfig = {
  apiBaseUrl: 'https://localhost:7263/', // Base URL for your API
  endpoints: {
    login: 'api/auth/login', 
    signup: 'api/auth/createuser',
    checkauth: 'api/auth/checkauth',
    logout: 'api/auth/logout',
    googlelogin: 'api/auth/google-login',
  },
};
