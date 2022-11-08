import { Component, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-awards",
  templateUrl: "./awards.component.html",
  styleUrls: ["./awards.component.scss"],
})
export class AwardsComponent implements OnInit {
  sticky: boolean = false;

  constructor() {}

  ngOnInit(): void {}

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
