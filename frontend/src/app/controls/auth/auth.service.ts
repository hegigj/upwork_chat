import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class AuthService {
  private _url: string;
  private _user$: BehaviorSubject<User>;
  private _user: User;

  constructor(private _httpClient: HttpClient, private _router: Router) {
    this._url = 'http://localhost:3000/svc/auth';
    this._user$ = new BehaviorSubject<User>(null);
  }

  private _setUser(user) {
    this._user = user;
    this._user$.next(this._user);
    localStorage.setItem('CHAT_TOKEN', this._user.authToken);
  }

  private _resetUser() {
    this._user = null;
    this._user$.next(this._user);
    localStorage.removeItem('CHAT_TOKEN');
    this._router.navigate(['/sign-in']).then();
  }

  get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  signIn(user) {
    return this._httpClient.post(`${this._url}/signIn`, user).pipe(map((res: any) => {
      if (res.status.code === 'STATUS_OK') {
        this._setUser(res.body.data);
        return true;
      }
    }));
  }

  signUp(user) {
    return this._httpClient.post(`${this._url}/signUp`, user).pipe(map((res: any) => {
      if (res.status.code === 'STATUS_OK') {
        return true;
      }
    }))
  }

  getStatus(): Observable<boolean> {
    return this._httpClient.get(`${this._url}/status`).pipe(map((res: any) => {
      if (res.status.code === 'STATUS_OK') {
        this._setUser(res.body.data);
        return true;
      } else {
        return false;
      }
    }));
  }
}
