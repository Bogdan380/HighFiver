import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../services/employee.service";
import { Employee } from "../../model/employee";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-sidebar",
  templateUrl: "./admin-sidebar.component.html",
  styleUrls: ["./admin-sidebar.component.scss"],
})
export class AdminSidebarComponent implements OnInit {
  public employee!: Employee;
  imageUrl!: string;
  routes: string[] = ["/admin/dashboard", "/admin/points", "/admin/rewards"];
  route1: string = "";
  route2: string = "";
  name1: string = "";
  name2: string = "";

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.employee.subscribe((data) => {
      this.employee = data;
      this.imageUrl = data.imageUrl;
    });
    const url = this.router.url;
    if (url == "/admin/dashboard") {
      this.route1 = "/admin/points";
      this.route2 = "/admin/rewards";
      this.name1 = "Rewards Administration";
      this.name2 = "Points Administration";
    } else if (url == "/admin/points") {
      this.route1 = "/admin/dashboard";
      this.route2 = "/admin/rewards";
      this.name1 = "Rewards Administration";
      this.name2 = "Dashboard";
    } else if (url == "/admin/rewards") {
      this.route1 = "/admin/dashboard";
      this.route2 = "/admin/points";
      this.name1 = "Dashboard";
      this.name2 = "Points Administration";
    }
  }

  setDefaultPic() {
    this.imageUrl = "../../assets/static/profile_photo.png";
  }
}
