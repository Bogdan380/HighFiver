import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../services/employee.service";
import { Employee } from "../../model/employee";

@Component({
  selector: "app-user-data-display",
  templateUrl: "./user-data-display.component.html",
  styleUrls: ["./user-data-display.component.scss"],
})
export class UserDataDisplayComponent implements OnInit {
  public employee: Employee = {} as Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.employee.subscribe((data) => {
      this.employee = data;
    });
  }
}
