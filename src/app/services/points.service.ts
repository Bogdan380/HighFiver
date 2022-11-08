import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Points } from "../model/points";

@Injectable({
  providedIn: "root",
})
export class PointsService {
  private path: string = "https://apihigh-prod.interns.sbgpoc.com/points";
  private pathDays: string =
    "https://recognition-service-prod.interns.sbgpoc.com/api/refresh_interval";
  private id: number = 0;

  constructor(private http: HttpClient) {}

  putData(points: number): Observable<Points> {
    const data = {
      maxPoints: points,
      minPoints: 0,
    };

    return this.http.put<Points>(this.path, data);
  }

  refreshData(days: number): Observable<number> {
    const data = {
      numDays: days,
    };

    return this.http.put<number>(this.pathDays, data);
  }
}
