import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { ApiGlobals } from '../../utility/ApiGlobals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public displayMessage = false;
  public alertMessage: string;

  constructor(private authService: AuthService,
              private router: Router) {}
  ngOnInit() {}

  onLogin(): void {

    this.authService.login(this.email, this.password)
      .subscribe(
        () => {
          this.router.navigateByUrl(ApiGlobals.projectsRoute);
        },
        () => {
          this.displayMessage = true;
          this.alertMessage = 'Invalid Email / Password';
        });
  }

  onRegister(): void {

    this.authService.register(this.email, this.password)
      .subscribe(
        () => {
          this.displayMessage = true;
          this.alertMessage = 'Registration Successful';
        },
        () => {
          this.displayMessage = true;
          this.alertMessage = 'Invalid Registration';
        }
      );
  }
}
