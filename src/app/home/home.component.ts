import { Component, HostListener, OnInit } from "@angular/core";
import { EmployeeService } from "../services/employee.service";
import { ModalService } from "../services/modal.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  sticky: boolean = false;
  imageUrl!: string;

  constructor(
    private modalService: ModalService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeService.getUserData().subscribe();
    this.employeeService.employee.subscribe((data) => {
      this.imageUrl = data.imageUrl;
    });
  }

  goToHome() {
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
