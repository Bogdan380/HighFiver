import { Component, HostListener, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-admin-rewards-first-page',
  templateUrl: './admin-rewards-first-page.component.html',
  styleUrls: ['./admin-rewards-first-page.component.scss']
})
export class AdminRewardsFirstPageComponent implements OnInit {
  sticky: boolean = false;

  constructor(private employeeService: EmployeeService) { }

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

}
