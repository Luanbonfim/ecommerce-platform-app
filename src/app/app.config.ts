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
  redirectUrl: 'http://localhost:4200', // Frontend redirect URL
  endpoints: {
    login: 'api/v1/auth/login', 
    signup: 'api/v1/auth/createuser',
    checkauth: 'api/v1/auth/checkauth',
    logout: 'api/v1/auth/logout',
    googlelogin: 'api/v1/auth/google-login',
    products:{
      products: 'api/v1/products',
    }
  },
};
