import { Component, HostListener, Input, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Employee } from "src/app/model/employee";
import { AuthService } from "../../services/auth.service";
import { EmployeeService } from "../../services/employee.service";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class NavigationBarComponent implements OnInit {
  sticky: boolean = false;
  @Input() showAwardsIcon = true;
  imageUrl!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private _ngZone: NgZone,
    public modalService: ModalService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getUserData().subscribe();
    this.employeeService.employee.subscribe((data) => {
      this.imageUrl = data.imageUrl;
    });
  }

  goToHome() {
    const token = localStorage.getItem("token");
    const user: Employee = this.authService.getDecodedAccessToken(
      token ? token : ""
    );
    if (user.role == "Experience manager") {
      this.router.navigate(["/admin/home"]);
    } else this.router.navigate(["/home"]);

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  goToAwards() {
    const url = this.router.url;
    if (url == "/awards") location.reload();
    else this.router.navigate(["/awards"]);

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public signOut() {
    this.authService.signOut();
    this._ngZone.run(() => {
      this.router.navigate(["/"]).then(() => window.location.reload());
    });
  }

  public goToProfile() {
    const token = localStorage.getItem("token");
    const user: Employee = this.authService.getDecodedAccessToken(
      token ? token : ""
    );
    if (user.role == "Experience manager") {
      this.router.navigate(["/admin/profile"]);
    } else this.router.navigate(["/profile"]);

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  @HostListener("window:scroll", ["$event"])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= 60) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  setDefaultPic() {
    this.imageUrl = "../../assets/static/profile_photo.png";
  }
}
