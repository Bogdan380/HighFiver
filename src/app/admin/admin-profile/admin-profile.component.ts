import { Component, HostListener, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-admin-profile",
  templateUrl: "./admin-profile.component.html",
  styleUrls: ["./admin-profile.component.scss"],
})
export class AdminProfileComponent implements OnInit {
  sticky: boolean = false;
  imageUrl!: string;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getUserData().subscribe();
    this.employeeService.employee.subscribe((data) => {
      this.imageUrl = data.imageUrl;
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
