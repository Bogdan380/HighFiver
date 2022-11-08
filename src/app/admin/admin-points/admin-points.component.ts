import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Points } from "src/app/model/points";
import { ModalService } from "src/app/services/modal.service";
import { PointsService } from "src/app/services/points.service";

@Component({
  selector: "app-admin-points",
  templateUrl: "./admin-points.component.html",
  styleUrls: ["./admin-points.component.scss"],
})
export class AdminPointsComponent implements OnInit {
  points: number = 0;
  error: string = "";
  errorDays: string = "";
  returnPoints!: Points;
  returnDays!: number;
  days: number = 0;

  constructor(public modalService: ModalService, private router: Router, private pointsService: PointsService) {}

  ngOnInit(): void {}

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  goBack() {
    this.router.navigate(["admin/home"]);
  }

  checkPoints() {
    if (this.points > 0 && this.points <= 100 && Math.floor(this.points) === this.points) {
      this.closeModal('assign-modal'); 
      this.openModal('confirm-modal');
      this.error = "";
    }
    else if (Math.floor(this.points) !== this.points) {
      this.error = "Number of points must be an integer!";
    } 
    else {
      this.error = "Number of points must be in range of 1 to 100!";
    }
  }

  checkDays() {
    console.log(this.days);
    if (this.days > 0 && this.days <= 30 && Math.floor(this.days) === this.days) {
      this.closeModal('assign-modal-2'); 
      this.openModal('confirm-modal-2');
      this.errorDays = "";
    }
    else if (Math.floor(this.days) !== this.days) {
      this.errorDays = "Number of days must be an integer!";
    } else {
      this.errorDays = "Number of days must be in range of 1 to 30!";
    }
  }

  async persistPoints() {
    this.pointsService.putData(this.points).subscribe((data) => {
      this.returnPoints = data;
    });
    this.closeModal('confirm-modal');
    await new Promise(f => setTimeout(f, 1000));
    console.log(this.returnPoints);
  }

  async persistDays() {
    this.pointsService.refreshData(this.days).subscribe((data) => {
      this.returnDays = data;
    });
    this.closeModal('confirm-modal-2');
    await new Promise(f => setTimeout(f, 1000));
    console.log(this.returnDays);
  }
}
