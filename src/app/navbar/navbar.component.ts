import { Component, OnInit } from '@angular/core';
import { JwtAuthService } from '../services/authentication/jwt-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserAuthenticated: boolean = false;

  constructor(
    private jwtAuth: JwtAuthService
  ) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.jwtAuth.isUserLoggedIn();
  }

  logout() {
    this.jwtAuth.logout();
  }

}
