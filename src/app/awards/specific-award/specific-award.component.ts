import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Employee } from "src/app/model/employee";
import { EmployeeService } from "src/app/services/employee.service";
import { AwardFull } from "../../model/award_full";
import { ModalService } from "../../services/modal.service";
import { SpecificAwardService } from "../../services/specific-award.service";

@Component({
  selector: "app-specific-award",
  templateUrl: "./specific-award.component.html",
  styleUrls: ["./specific-award.component.scss"],
})
export class SpecificAwardComponent implements OnInit {
  notEnoughTokens: boolean = false;
  moreThanEnoughTokens: boolean = false;
  awardRequiredTokens: number = 0;
  successfulTransaction: boolean = false;
  award!: AwardFull;
  public employee: Employee = {} as Employee;

  constructor(
    private route: ActivatedRoute,
    public modalService: ModalService,
    private awardService: SpecificAwardService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.awardService.getData(id ? id : "").subscribe((data) => {
      this.award = data as AwardFull;
    });
    this.employeeService.employee.subscribe((data) => {
      this.employee = data;
    });
  }

  deleteNotEnoughFlag() {
    this.notEnoughTokens = false;
  }

  deleteSuccessfulFlag() {
    this.successfulTransaction = false;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  check() {
    if (this.notEnoughTokens == false) this.moreThanEnoughTokens = true;
  }

  sleep(num: number) {
    let now = new Date();
    let stop = now.getTime() + num;
    while(true) {
        now = new Date();
        if(now.getTime() > stop) return;
    }
}

  commitTransaction() {
    const id = this.route.snapshot.paramMap.get("id");
    this.closeModal('points-modal');
    console.log(this.employee.profileId);
    this.moreThanEnoughTokens = true;
    this.notEnoughTokens = false;
    this.awardService.redeem(this.employee.profileId, id ? id : "").subscribe({ error: error => {
      console.error('There was an error!', error);
      if (error.error.message == "Not enough points to redeem this award!") {
        this.moreThanEnoughTokens = false;
        this.notEnoughTokens = true;
      }
    }});
    this.sleep(500);
  }
}
