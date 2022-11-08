import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-all-page',
  templateUrl: './admin-all-page.component.html',
  styleUrls: ['./admin-all-page.component.scss']
})
export class AdminAllPageComponent implements OnInit {
  sticky: boolean = false;

  constructor() { }

  ngOnInit(): void {
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
