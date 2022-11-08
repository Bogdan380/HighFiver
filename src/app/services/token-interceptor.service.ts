import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export const BYPASS_TOKEN = new HttpContextToken(() => false);

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");

    if (request.context.get(BYPASS_TOKEN) === true) {
      return next.handle(request);
    }

    if (!token) {
      return next.handle(request);
    }

    const modifiedReq = request.clone({
      setHeaders: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(modifiedReq);
  }
}
