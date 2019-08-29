import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../controls/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInTab: boolean;

  constructor(private _authService: AuthService, private _router: Router) {
    this.signInTab = true;
  }

  ngOnInit() {
  }

  signIn(usernameOrEmail, password) {
    if (usernameOrEmail && password) {
      const singIn = {username: usernameOrEmail, email: usernameOrEmail, password: password};
      this._authService.signIn(singIn).subscribe((res: boolean) => {
        if (res) {
          this._router.navigate(['/messages']).then();
        }
      });
    }
  }

  signUp(firstName, lastName, email, username, password) {
    if (firstName && lastName && email && username && password) {
      if (email.match(/[a-zA-Z._\-]+@[a-z]+\.([a-z]+|[a-z]+\.[a-z]+)/g)) {
        const signUp = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          password: password
        };
        this._authService.signUp(signUp).subscribe((res: boolean) => {
          this.signInTab = res;
        });
      }
    }
  }
}
