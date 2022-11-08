import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeeService } from "../../services/employee.service";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"],
})
export class UserCardComponent implements OnInit {
  imageUrl!: string;
  redeemPoints!: number;
  givePoints!: number;
  @Input() showButton = true;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.getUserPortfolio().subscribe();
    setInterval(
      () => this.employeeService.getUserPortfolio().subscribe(),
      5000
    );

    this.employeeService.employee.subscribe((data) => {
      this.imageUrl = data.imageUrl;
    });

    this.employeeService.portfolio.subscribe((data) => {
      this.redeemPoints = data.earned_points;
      this.givePoints = data.total_points;
    });
  }

  goToAwards() {
    this.router.navigate(["/awards"]);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  setDefaultPic() {
    this.imageUrl = "../../assets/static/profile_photo.png";
  }
}
