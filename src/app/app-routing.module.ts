import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { ProfileComponent } from "./profile/profile.component";
import { AwardsComponent } from "./awards/awards.component";
import { SpecificAwardPageComponent } from "./awards/specific-award-page/specific-award-page.component";
import { AuthGuard } from "./auth.guard";
import { AdminStartComponent } from "./admin/admin-start/admin-start.component";
import { AdminGuard } from "./admin.guard";
import { AdminRewardsFirstPageComponent } from "./admin/admin-rewards-first-page/admin-rewards-first-page.component";
import { AdminAllAwardsComponent } from "./admin/admin-all-awards/admin-all-awards.component";
import { AdminEditPageComponent } from "./admin/admin-edit-page/admin-edit-page.component";
import { AdminAllPageComponent } from "./admin/admin-all-page/admin-all-page.component";
import { AdminPointsPageComponent } from "./admin/admin-points-page/admin-points-page.component";
import { AdminProfileComponent } from "./admin/admin-profile/admin-profile.component";
import { NotadminGuard } from "./notadmin.guard";

const routes: Routes = [
  { path: "", redirectTo: "signin", pathMatch: "full" },
  { path: "signin", component: SignInComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard, NotadminGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard, NotadminGuard] },
  { path: "awards", component: AwardsComponent, canActivate: [AuthGuard, NotadminGuard] },
  {
    path: "award/:id",
    component: SpecificAwardPageComponent,
    canActivate: [AuthGuard, NotadminGuard],
  },
  {
    path: "admin/home",
    component: AdminStartComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "admin/profile",
    component: AdminProfileComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "admin/rewards",
    component: AdminRewardsFirstPageComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "admin/dashboard",
    component: AdminStartComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "admin/points",
    component: AdminPointsPageComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "admin/edit/:id",
    component: AdminEditPageComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "admin/all",
    component: AdminAllPageComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: "**", component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
