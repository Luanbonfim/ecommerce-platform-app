import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-homepage',
  imports: [LoginComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
