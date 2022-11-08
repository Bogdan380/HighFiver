import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Filter } from "src/app/awards/awards-showcase/awards-showcase.component";
import { AwardFull } from "src/app/model/award_full";
import { PhotoServiceService } from "src/app/services/photo-service.service";
import { SpecificAwardService } from "src/app/services/specific-award.service";

@Component({
  selector: "app-admin-edit",
  templateUrl: "./admin-edit.component.html",
  styleUrls: ["./admin-edit.component.scss"],
})
export class AdminEditComponent implements OnInit {
  filters: Filter[] = [];
  name: string = "";
  value: number = 0;
  description: string = "";
  selectedFilter: number = -1;
  error: boolean = false;
  imageUrl: string = "imageUrl";
  errorText: string = "";
  award!: AwardFull;
  categoryText: string = "Choose a category";
  file: File | null = null;
  fileName: string = "";

  constructor(
    private route: ActivatedRoute,
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
    const id = this.route.snapshot.paramMap.get("id");
    this.awardService.getData(id ? id : "").subscribe((data) => {
      this.award = data as AwardFull;
    });
  }

  public errorHandling(): boolean {
    this.error = false;
    if (this.award.name == "") {
      this.error = true;
      this.errorText = "Award name cannot be empty!";
    } else if (this.award.points <= 0) {
      this.error = true;
      this.errorText = "Award value cannot be smaller than 1!";
    } else if (this.award.points > 100) {
      this.error = true;
      this.errorText = "Award value cannot be larger than 100!";
    } else if (this.award.details == "") {
      this.error = true;
      this.errorText = "Award description cannot be empty!";
    }
    if (this.error == true) return true;
    else return false;
  }

  public onFilterChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFilter = +target.value + 1;
    console.log(this.selectedFilter);
    this.award.group.groupName = this.filters[this.selectedFilter - 1].name;
    this.award.group.groupId = this.selectedFilter;
  }

  public async persistAward() {
    const hasError = this.errorHandling();
    if (hasError) return;
    const id = this.route.snapshot.paramMap.get("id");
    this.awardService.putData(
      this.award.name,
      this.award.details,
      this.award.points,
      this.award.imageUrl,
      this.award.group.groupId,
      id
    );
    this.router.navigate(["/admin/all"]);
  }

  async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = target?.files ? target.files[0] : null;
    if (this.file) {
      this.fileName = this.file.name;
      console.log(this.fileName);
    }
    this.photoService.postData(this.fileName, this.file);
    await new Promise((f) => setTimeout(f, 1000));
    this.imageUrl =
      "https://highbucketfiver.s3.amazonaws.com/" + this.photoService.fileKey;
    this.award.imageUrl = this.imageUrl;
  }
}
