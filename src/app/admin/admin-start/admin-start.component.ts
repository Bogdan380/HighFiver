import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-admin-start",
  templateUrl: "./admin-start.component.html",
  styleUrls: ["./admin-start.component.scss"],
})
export class AdminStartComponent implements OnInit {
  sticky: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.getUserData().subscribe();
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

  navigateToRewards() {
    this.router.navigate(["admin/rewards"]);
  }

  navigateToPoints() {
    this.router.navigate(["admin/points"]);
  }
}
