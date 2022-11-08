import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Filter } from "src/app/awards/awards-showcase/awards-showcase.component";
import { AwardFull } from "src/app/model/award_full";
import { PhotoServiceService } from "src/app/services/photo-service.service";
import { SpecificAwardService } from "src/app/services/specific-award.service";

@Component({
  selector: "app-rewards-administration-start",
  templateUrl: "./rewards-administration-start.component.html",
  styleUrls: ["./rewards-administration-start.component.scss"],
})
export class RewardsAdministrationStartComponent implements OnInit {
  filters: Filter[] = [];
  inputFlag: boolean = false;
  name: string = "";
  value: number = 0;
  description: string = "";
  selectedFilter: number = -1;
  error: boolean = false;
  imageUrl: string = "imageUrl";
  errorText: string = "";
  categoryText: string = "Choose a category";
  fileName: string = "";
  file: File | null = null;

  constructor(
    private awardService: SpecificAwardService,
    private photoService: PhotoServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filters = [
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
  }

  goBack() {
    this.router.navigate(["admin/home"]);
  }

  public errorHandling(): boolean {
    this.error = false;
    if (this.name == "") {
      this.error = true;
      this.errorText = "Award name cannot be empty!";
    } else if (this.value <= 0) {
      this.error = true;
      this.errorText = "Award value cannot be smaller than 1!";
    } else if (this.value > 100) {
      this.error = true;
      this.errorText = "Award value cannot be larger than 100!";
    } else if (this.description == "") {
      this.error = true;
      this.errorText = "Award description cannot be empty!";
    } else if (this.selectedFilter == -1) {
      this.error = true;
      this.errorText = "A category must be chosen!";
    } else if (this.file == null) {
      this.error = true;
      this.errorText = "A photo must be uploaded!";
    }
    if (this.error == true) return true;
    else return false;
  }

  public onFilterChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFilter = +target.value + 1;
    console.log(this.selectedFilter);
    this.categoryText = this.filters[this.selectedFilter - 1].name;
  }

  public async persistAward() {
    const hasError = this.errorHandling();
    if (hasError) return;
    this.imageUrl =
      "https://highbucketfiver.s3.amazonaws.com/" + this.photoService.fileKey;
    this.awardService.postData(
      this.name,
      this.description,
      this.value,
      this.imageUrl,
      this.selectedFilter
    );
    await new Promise((f) => setTimeout(f, 1000));
    if (this.awardService.ret != "") {
      this.error = true;
      this.errorText = this.awardService.ret;
    }
    else this.router.navigate(["/admin/all"]);
  }

  async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = target?.files ? target.files[0] : null;
    if (this.file) {
      this.fileName = this.file.name;
      console.log(this.fileName);
      this.photoService.postData(this.fileName, this.file);
      await new Promise((f) => setTimeout(f, 1000));
    }
  }
}
