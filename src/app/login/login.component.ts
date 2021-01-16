import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtAuthService } from '../services/authentication/jwt-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isPasswordVisible: boolean = false;
  isErrorMsgVisible: boolean;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private authService: JwtAuthService
  ) {}

  ngOnInit(): void {
    this.isErrorMsgVisible = false;
  }

  toggleEyeIcon(event) {
    this.isPasswordVisible = !this.isPasswordVisible;
    if (event.target.classList.contains('fa-eye')) {
      this.renderer.removeClass(event.target, 'fa-eye');
      this.renderer.addClass(event.target, 'fa-eye-slash');
    } else if (event.target.classList.contains('fa-eye-slash')) {
      this.renderer.removeClass(event.target, 'fa-eye-slash');
      this.renderer.addClass(event.target, 'fa-eye');
    }
  }

  onLogin(form: NgForm) {
    this.authService
      .executeJwtAuth(form.value['email'], form.value['password'])
      .subscribe(
        () => this.router.navigate(['/']),
        (error) => {
          console.log(error);
          this.isErrorMsgVisible = true;
        }
      );
  }
}
