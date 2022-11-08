import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { AwardFull } from "../model/award_full";

@Injectable({
  providedIn: "root",
})
export class SpecificAwardService {
  private path: string =
    "https://sugar-grinder-prod.interns.sbgpoc.com/api/products";
  private id: number = 0;
  private redeemPath: string =
    "https://sugar-grinder-prod.interns.sbgpoc.com/api/products/redeem";
  public ret: string = "";

  constructor(private http: HttpClient) {}

  getData(id: string) {
    const newPath = this.path + "/" + id;

    return this.http.get<AwardFull>(newPath, {});
  }

  async postData(
    name: string,
    desc: string,
    value: number,
    imageUrl: string,
    category: number
  ) {
    const data = {
      name: name,
      details: desc,
      points: value,
      imageUrl: imageUrl,
      groupId: category,
    };

    this.ret = "";

    this.http.post<AwardFull>(this.path, data).subscribe({
      next: (data) => {
        this.id = data.prodId;
      },
      error: (error) => {
        console.error("There was an error!", error.error.message);
        this.ret = error.error.message;
      },
    });

    await new Promise((f) => setTimeout(f, 1000));
    console.log(this.id);
    //setTimeout(() => window.location.reload(), 500);
  }

  async putData(
    name: string,
    desc: string,
    value: number,
    imageUrl: string,
    category: number,
    id: string | null
  ) {
    const newPath = this.path + "/" + id;

    const data = {
      name: name,
      details: desc,
      points: value,
      imageUrl: imageUrl,
      groupId: category,
    };

    this.http.put<AwardFull>(newPath, data).subscribe({
      next: (data) => {
        this.id = data.prodId;
      },
      error: (error) => {
        console.error("There was an error!", error.error.message);
      },
    });

    await new Promise((f) => setTimeout(f, 1000));
    console.log(id);
    setTimeout(() => window.location.reload(), 500);
  }

  async deleteData(id: string | null) {
    const newPath = this.path + "/" + id;

    this.http.delete<AwardFull>(newPath).subscribe({
      error: (error) => {
        console.error("There was an error!", error);
      },
    });
    await new Promise(f => setTimeout(f, 1000));
    console.log(id);
    setTimeout(() => window.location.reload(), 500);
  }

  redeem(userId: number, awardId: string): Observable<any> {
    const data = {
      portfolioId: userId,
      productId: +awardId,
    };

    return this.http.post<any>(this.redeemPath, data);
  }
}
