import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Filter } from "src/app/awards/awards-showcase/awards-showcase.component";
import { Award } from "src/app/model/award";
import { AwardsListingService } from "src/app/services/awards-listing.service";
import { ModalService } from "src/app/services/modal.service";
import { SpecificAwardService } from "src/app/services/specific-award.service";

@Component({
  selector: "app-admin-all-awards",
  templateUrl: "./admin-all-awards.component.html",
  styleUrls: ["./admin-all-awards.component.scss"],
})
export class AdminAllAwardsComponent implements OnInit {
  constructor(
    public router: Router,
    public modalService: ModalService,
    private list: AwardsListingService,
    private awardService: SpecificAwardService
  ) {}

  filters: Filter[] = [];
  awards: Award[] = [];
  flagEmptyBox: boolean = true;
  flagResultsFilter: boolean = false;
  flagAllAwards: boolean = false;
  flagVoucher: boolean = true;
  flagFilter: boolean = false;
  flagDisplay: boolean = true;
  flagCategories: boolean = true;
  noAwardsFlag: boolean = false;
  finished: boolean = false;
  choice: number = 0;
  filt: string = "";

  ngOnInit(): void {
    this.filters = [
      {
        name: "Select all",
        checked: false,
      },
      {
        name: "Gift cards",
        checked: false,
      },
      {
        name: "Company store",
        checked: false,
      },
      {
        name: "Clothes",
        checked: false,
      },
      {
        name: "Charity",
        checked: false,
      },
    ];

    this.getAwards();
  }

  searchTerm: string = "";

  async onSearchSubmit() {
    this.noAwardsFlag = false;
    this.flagEmptyBox = false;
    this.flagResultsFilter = true;
    this.flagAllAwards = false;
    this.flagVoucher = false;
    this.flagCategories = false;
    this.flagFilter = true;
    this.flagDisplay = false;
    this.getAwards();
    this.closeModal("search-modal");
    await new Promise((f) => setTimeout(f, 1000));
    if (this.awards.length == 0) this.noAwardsFlag = true;
    else this.noAwardsFlag = false;
    this.searchTerm = "";
  }

  get result() {
    return this.filters
      .filter((filter) => filter.checked)
      .map(function (a) {
        return a.name;
      });
  }

  changeCheckboxAll() {
    let i;
    for (i = 1; i < 5; i++) this.filters[i].checked = false;
  }

  changeCheckboxFilter() {
    this.filters[0].checked = false;
  }

  async onFilterSubmit() {
    this.noAwardsFlag = false;
    this.flagEmptyBox = false;
    this.flagResultsFilter = true;
    this.flagAllAwards = false;
    this.flagVoucher = false;
    this.flagCategories = false;
    this.flagFilter = true;
    this.flagDisplay = false;
    this.getAwards();
    this.closeModal("filter-modal");
    await new Promise((f) => setTimeout(f, 1000));
    if (this.awards.length == 0) this.noAwardsFlag = true;
    else this.noAwardsFlag = false;
    let i;
    for (i = 0; i < 5; i++) this.filters[i].checked = false;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public getAwards() {
    this.filt = this.result.join(",");
    if (this.result.includes("Select all")) this.filt = "";
    this.list.getData(this.searchTerm, this.filt).subscribe((data) => {
      this.awards = data as Award[];
      this.finished = true;
    });
  }

  delete(id: number) {
    this.choice = id;
    this.openModal("delete-modal");
  }

  deleteAward() {
    this.awardService.deleteData(this.choice.toString());
    window.location.reload();
  }

  goBack() {
    this.router.navigate(["admin/rewards"]);
  }
}
