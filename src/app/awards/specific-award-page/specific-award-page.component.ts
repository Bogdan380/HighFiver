import { Component, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-specific-award-page",
  templateUrl: "./specific-award-page.component.html",
  styleUrls: ["./specific-award-page.component.scss"],
})
export class SpecificAwardPageComponent implements OnInit {
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
}
