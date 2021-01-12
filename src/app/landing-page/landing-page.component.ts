import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AUTHENTICATED_USER } from '../constants';
import { JwtAuthService } from '../services/authentication/jwt-auth.service';
import { SignUpService } from '../services/registration/sign-up.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  wasCreatedSuccessfully: boolean = false;
  isUserAuthenticated: boolean;
  userEmail: string;

  constructor(
    private signupService: SignUpService,
    private jwtAuth: JwtAuthService
  ) { }

  ngOnInit(): void {
    if(this.jwtAuth.isUserLoggedIn()) {
      this.isUserAuthenticated = true;
      this.userEmail = sessionStorage.getItem(AUTHENTICATED_USER);
    }
  }

  onSignUp(form: NgForm) {
    console.log('form');
    if(form.valid) {
      console.log('valid');
      this.signupService.register(form.value['email'], form.value['password']).subscribe();
    }
  }

}
