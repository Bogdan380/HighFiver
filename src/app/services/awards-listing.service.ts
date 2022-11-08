import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Award } from "../model/award";

@Injectable({
  providedIn: "root",
})
export class AwardsListingService {
  private path: string =
    "https://sugar-grinder-prod.interns.sbgpoc.com/api/products";

  constructor(private http: HttpClient) {}

  getData(searchName: string, groups: string) {
    let queryParams = new HttpParams()
      .append("name", searchName)
      .append("groups", groups);

    return this.http.get<Award[]>(this.path, {
      params: queryParams,
    });
  }
}
