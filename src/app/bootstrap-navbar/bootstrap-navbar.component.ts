import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bootstrap-navbar',
  templateUrl: './bootstrap-navbar.component.html',
  styleUrls: ['./bootstrap-navbar.component.css']
})
export class BootstrapNavbarComponent {

  constructor(public auth: AuthService) {
  }

 logout() {
   this.auth.logout();
 }
}
