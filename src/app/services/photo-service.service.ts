import { HttpClient, HttpContext, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PhotoResponse } from "../model/photo_response";
import { BYPASS_TOKEN } from "./token-interceptor.service";

@Injectable({
  providedIn: "root",
})
export class PhotoServiceService {
  private path: string =
    "https://sugar-grinder-prod.interns.sbgpoc.com/api/storage/image/presigned";
  public fileKey: string = "";
  public presignedUrl: string = "";

  constructor(private http: HttpClient) {}

  async postData(fileName: string, file: File | null) {
    const data: string = fileName;

    this.http.post<PhotoResponse>(this.path, data).subscribe({
      next: (data) => {
        this.fileKey = data.fileKey;
        this.presignedUrl = data.presignedUrl;
      },
      error: (error) => {
        console.error("There was an error!", error);
      },
    });

    await new Promise((f) => setTimeout(f, 1000));
    console.log(this.presignedUrl);

    this.http
      .put(this.presignedUrl, file, {
        context: new HttpContext().set(BYPASS_TOKEN, true),
      })
      .subscribe({
        error: (error) => {
          console.error("GRESKA GRESKA", error);
        },
      });
  }
}
