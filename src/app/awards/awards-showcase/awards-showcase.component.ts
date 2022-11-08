import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AwardsListingService } from "../../services/awards-listing.service";
import { ModalService } from "../../services/modal.service";
import { Award } from "../../model/award";

export class Filter {
  name: string = "";
  checked: boolean = false;
}

@Component({
  selector: "app-awards-showcase",
  templateUrl: "./awards-showcase.component.html",
  styleUrls: ["./awards-showcase.component.scss"],
})
export class AwardsShowcaseComponent implements OnInit {
  constructor(
    public router: Router,
    public modalService: ModalService,
    private list: AwardsListingService
  ) {}

  filters: Filter[] = [];
  awards: Award[] = [];
  giftCards: Award[] = [];
  companyStore: Award[] = [];
  clothes: Award[] = [];
  charity: Award[] = [];
  flagEmptyBox: boolean = true;
  flagResultsFilter: boolean = false;
  flagAllAwards: boolean = false;
  flagVoucher: boolean = true;
  flagFilter: boolean = false;
  flagDisplay: boolean = true;
  flagCategories: boolean = true;
  noAwardsFlag: boolean = false;
  finished: boolean = false;
  lower: number[] = [0,0,0,0];
  higher: number[] = [2,2,2,2];
  len: number[] = [];
  filt: string = '';
  listings: Award[][] = [];

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

    this.getAwardsByFilter("Gift cards", 0)
    this.getAwardsByFilter("Company store", 1);
    this.getAwardsByFilter("Clothes", 2);
    this.getAwardsByFilter("Charity", 3);
    var i: number = 0;
    //for (i = 0; i < 4; i++) {
    //  this.len[i] = this.listings[i].length;
    //}
  }

  goToHome() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
    this.closeModal('search-modal');
    await new Promise(f => setTimeout(f, 1000));
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
    this.closeModal('filter-modal');
    await new Promise(f => setTimeout(f, 1000));
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

  public goToAwards() {
    this.router.navigate(["/awards"]);

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  public getAwards() {
    this.filt = this.result.join(",");
    if (this.result.includes('Select all')) this.filt = "";
    this.list.getData(this.searchTerm, this.filt).subscribe((data) => {
      this.awards = data as Award[];
      this.finished = true;
    });
  }

  public getAwardsByFilter(filter: string, id: number) {
    this.list.getData("", filter).subscribe((data) => {
      this.listings[id] =  data as Award[];
    });
  }

  public turnLeft(id: number) {
    if (this.higher[id] > 0 && this.lower[id] > 0) {
      this.higher[id]--;
      this.lower[id]--;
    }
  }

  public turnRight(id: number) {
    if (this.higher[id] < this.listings[id].length - 1 && this.lower[id] < this.listings[id].length - 1) {
      this.higher[id]++;
      this.lower[id]++;
    }
  }

  public displayCustom(id:number) {
    this.filters[id].checked = true;
    this.onFilterSubmit();
    this.filters[id].checked = false;
  }
}
