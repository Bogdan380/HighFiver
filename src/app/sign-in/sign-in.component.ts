import { ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CredentialResponse, PromptMomentNotification } from "google-one-tap";
import { AuthService } from "../services/auth.service";
import { environment } from "src/environments/environment";
import { Employee } from "../model/employee";
import { Subject } from "rxjs";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  clientId = environment.clientId;
  //error$ = new Subject<boolean>();
  error = false;
  errorMessage = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private detectChange: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(environment.url);
    if (localStorage.getItem("token")) {
      const user: Employee = this.authService.getDecodedAccessToken(
        localStorage.getItem("token")!
      );
      if (user.role == "Experience manager") {
        this.router.navigate(["/admin/home"]);
      } else this.router.navigate(["/home"]);
    }

    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
        {
          theme: "outline",
          size: "large",
          width: "300",
          locale: "en",
        }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  handleResponse(googleResponse: CredentialResponse) {
    this.authService.signInWithGoogle(googleResponse.credential).subscribe({
      next: (response: any) => {
        localStorage.setItem("token", response.token);
        this.ngZone.run(() => {
          const token = localStorage.getItem("token");
          const user: Employee = this.authService.getDecodedAccessToken(
            token ? token : ""
          );
          if (user.role == "Experience manager") {
            this.router.navigate(["/admin/home"]);
          } else this.router.navigate(["/home"]);
        });
      },
      error: () => {
        this.errorMessage = "Employee with given email does not exist!";
        this.error = true;
        this.detectChange.detectChanges();
        this.router.navigate(["/signin"]);
      },
    });
  }

  refreshPage() {
    if (localStorage.getItem("token")) {
      window.location.reload();
    }
  }
}
