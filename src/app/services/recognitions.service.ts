import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Recognition } from "../model/recognition";
import { tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Employee } from "../model/employee-search";
import { Tag } from "../model/hashtag";

@Injectable({
  providedIn: "root",
})
export class RecognitionsService {
  private getUrl = environment.url + "recognitions";
  private tagsUrl = environment.url + "tags";
  private addUrl = environment.url + "recognition";
  private countUrl = this.addUrl + "/count";
  private recognitions: Recognition[] = [];
  private tags: Tag[] = [];

  constructor(private http: HttpClient) {}

  getRecognitions(): Observable<Recognition[]> {
    return this.http.get<Recognition[]>(this.getUrl).pipe(
      tap((data) => {
        this.recognitions = data;
      })
    );
  }

  getHashtags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagsUrl).pipe(
      tap((data) => {
        this.tags = data;
      })
    );
  }

  addRecognition(recognition: Recognition): Observable<Recognition> {
    return this.http.post<Recognition>(this.addUrl, recognition).pipe(
      tap((data) => {
        this.recognitions.unshift(data);
      })
    );
  }

  searchEmployees(term: string): Observable<Employee[]> {
    if (term.trim().length < 2) {
      return of([]);
    }
    return this.http
      .get<Employee[]>(
        `https://apihigh-prod.interns.sbgpoc.com/employee/filter/${term.trim()}`
      )
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError(this.handleError<Employee[]>("Search employees", []))
      );
  }

  returnRecognitions(): Recognition[] {
    return this.recognitions.slice();
  }

  returnTags(): Tag[] {
    return this.tags.slice();
  }

  handleError<T>(operation = "Operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation + " failed:");
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPaginationRecognitions(pageIndex: number): Observable<Recognition[]> {
    return this.http
      .get<Recognition[]>(
        `https://apihigh-prod.interns.sbgpoc.com/recognitions/?page=${pageIndex}`
      )
      .pipe(tap((data) => console.log(data)));
  }

  getRecognitionsCount(): Observable<number> {
    return this.http.get<number>(this.countUrl);
  }
}
