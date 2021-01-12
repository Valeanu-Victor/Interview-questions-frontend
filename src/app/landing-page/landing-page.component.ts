import { Component, OnInit, Renderer2 } from '@angular/core';
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

  isFormValid: boolean = true;
  isUserAuthenticated: boolean;
  userEmail: string;
  isPasswordVisible: boolean = false;
  isRepeatPasswordVisible: boolean = false;

  constructor(
    private signupService: SignUpService,
    private jwtAuth: JwtAuthService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if(this.jwtAuth.isUserLoggedIn()) {
      this.isUserAuthenticated = true;
      this.userEmail = sessionStorage.getItem(AUTHENTICATED_USER);
    }
  }

  toggleEye(event) {
    if(event.target.classList.contains('password')) {
      this.isPasswordVisible = !this.isPasswordVisible;
    } else if(event.target.classList.contains('repeatPassword')) {
      this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible;
    }

    if (event.target.classList.contains('fa-eye')) {
      this.renderer.removeClass(event.target, 'fa-eye');
      this.renderer.addClass(event.target, 'fa-eye-slash');
    } else if (event.target.classList.contains('fa-eye-slash')) {
      this.renderer.removeClass(event.target, 'fa-eye-slash');
      this.renderer.addClass(event.target, 'fa-eye');
    }
  }

  onSignUp(form: NgForm) {
    if(form.valid &&
      form.value['password'] === form.value['repeatPassword']) {
      console.log('valid');
      this.signupService.register(form.value['email'], form.value['password']).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.isFormValid = false;
    }
  }

}
