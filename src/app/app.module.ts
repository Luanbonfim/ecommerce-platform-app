import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from '../homepage/homepage.component';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from './services/auth.service';

@NgModule({
    declarations: [
      LoginComponent,
      HomepageComponent,
      AppComponent,
      SignupComponent,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      MatButtonModule,    
      RouterModule,
    ],
    providers: [AuthService, OAuthService],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
