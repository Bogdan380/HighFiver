import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeeService } from "../services/employee.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  sticky: boolean = false;
  imageUrl!: string;

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getUserData().subscribe();
    this.employeeService.employee.subscribe((data) => {
      this.imageUrl = data.imageUrl;
    });
  }

  goToHome() {
    this.router.navigate(["/home"]);

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

  refreshPage() {
    if (!localStorage.getItem("token")) {
      window.location.reload();
    }
  }
}
