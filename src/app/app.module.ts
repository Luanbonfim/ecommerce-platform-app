import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button'; 
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from '../homepage/homepage.component';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from './app.component';


@NgModule({
    declarations: [
      LoginComponent,  // Declare it here
      HomepageComponent,
      AppComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,  // Make sure AppRoutingModule is imported
      MatButtonModule,
      RouterModule, // Im
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
