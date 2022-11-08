import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Employee } from "../model/employee";
import { tap } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";
import { Portfolio } from "../model/portfolio";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private url = environment.url + "employee/";
  private urlPortfolio = environment.url + "portfolio/";

  public employee = new BehaviorSubject<Employee>({} as Employee);
  public portfolio = new Subject<Portfolio>();
  public id!: number;
  public user!: Employee;
  public pointsToGive!: number;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserData(): Observable<Employee> {
    this.id = this.authService.getDecodedAccessToken(
      localStorage.getItem("token") as string
    ).employeeId;

    return this.http.get<Employee>(this.url + this.id).pipe(
      tap((data) => {
        this.employee.next(data);
      })
    );
  }

  getUserPortfolio(): Observable<Portfolio> {
    return this.http.get<Portfolio>(this.urlPortfolio + this.id).pipe(
      tap((data) => {
        this.pointsToGive = data.total_points;
        this.portfolio.next(data);
      })
    );
  }
}
