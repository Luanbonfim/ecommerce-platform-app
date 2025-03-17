import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './features/home/components/home/homepage.component';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { LoginComponent } from './features/auth/components/login/login.component';

@NgModule({
    declarations: [
      LoginComponent,
      HomepageComponent,
      AppComponent,
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
