import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtAuthService } from '../services/authentication/jwt-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isPasswordVisible: boolean = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private authService: JwtAuthService
    ) { }

  ngOnInit(): void {
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
    console.log(form.value['email']);
    console.log(form.value['password']);
    this.authService.executeJwtAuth(form.value['email'], form.value['password'])
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error)
      );
  }

}
