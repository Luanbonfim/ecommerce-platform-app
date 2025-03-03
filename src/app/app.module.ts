import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from '../homepage/homepage.component';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from '../signup/signup.component';


@NgModule({
    declarations: [
      LoginComponent,  // Declare it here
      HomepageComponent,
      AppComponent,
      SignupComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,  // Make sure AppRoutingModule is imported
      MatButtonModule,
      RouterModule, 
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
