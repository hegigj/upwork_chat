import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../controls/auth/auth.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._authService.user$.subscribe((res: User) => {
      this.user = res;
    })
  }
}
