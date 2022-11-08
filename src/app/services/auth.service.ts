import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import jwt_decode from "jwt-decode";
import { Employee } from "../model/employee";
import { Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public decodedToken!: any;
  private url = environment.url + "login";
  public tokenStatus = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  signOut(): void {
    localStorage.removeItem("token");
    this.tokenStatus.next(false);
  }

  signInWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.http
      .post<any>(this.url, JSON.stringify(credentials), {
        headers: header,
      })
      .pipe(
        tap((response) => {
          this.tokenStatus.next(true);
          this.decodedToken = this.getDecodedAccessToken(response.token);
        })
      );
  }

  getDecodedAccessToken(token: string): any {
    return jwt_decode<Employee>(token);
  }
}
