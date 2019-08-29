import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('CHAT_TOKEN');

    const headers = {
      'Authorization': token,
      'Accept': 'application/json'
    };

    if (token) {
      return next.handle(
        req.clone({
          setHeaders: headers
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
