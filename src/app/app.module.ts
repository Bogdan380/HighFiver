import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProfileComponent } from "./profile/profile.component";
import { UserCardComponent } from "./shared/user-card/user-card.component";
import { ModalComponent } from "./shared/modal/modal.component";
import { UserDataDisplayComponent } from "./profile/user-data-display/user-data-display.component";
import { RecognitionInputComponent } from "./home/recognition-input/recognition-input.component";
import { RecognitionDisplayComponent } from "./home/recognition-display/recognition-display.component";
import { CelebrationsComponent } from "./shared/celebrations/celebrations.component";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { ClickOutsideDirective } from "./click-outside.directive";
import { ActivityTrackComponent } from "./profile/activity-track/activity-track.component";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { AwardsShowcaseComponent } from "./awards/awards-showcase/awards-showcase.component";
import { NavigationBarComponent } from "./shared/navigation-bar/navigation-bar.component";
import { AwardsComponent } from "./awards/awards.component";
import { SpecificAwardComponent } from "./awards/specific-award/specific-award.component";
import { SpecificAwardPageComponent } from "./awards/specific-award-page/specific-award-page.component";
import { AdminStartComponent } from "./admin/admin-start/admin-start.component";
import { AdminSidebarComponent } from "./admin/admin-sidebar/admin-sidebar.component";
import { RewardsAdministrationStartComponent } from "./admin/rewards-administration-start/rewards-administration-start.component";
import { AdminRewardsFirstPageComponent } from "./admin/admin-rewards-first-page/admin-rewards-first-page.component";
import { AdminAllAwardsComponent } from "./admin/admin-all-awards/admin-all-awards.component";
import { AdminEditComponent } from "./admin/admin-edit/admin-edit.component";
import { AdminEditPageComponent } from "./admin/admin-edit-page/admin-edit-page.component";
import { AdminAllPageComponent } from "./admin/admin-all-page/admin-all-page.component";
import { AdminPointsComponent } from "./admin/admin-points/admin-points.component";
import { AdminPointsPageComponent } from "./admin/admin-points-page/admin-points-page.component";
import { AdminProfileComponent } from "./admin/admin-profile/admin-profile.component";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    ProfileComponent,
    UserCardComponent,
    ModalComponent,
    UserDataDisplayComponent,
    RecognitionInputComponent,
    RecognitionDisplayComponent,
    CelebrationsComponent,
    ClickOutsideDirective,
    ActivityTrackComponent,
    NavigationBarComponent,
    AwardsComponent,
    AwardsShowcaseComponent,
    SpecificAwardComponent,
    SpecificAwardPageComponent,
    AdminStartComponent,
    AdminSidebarComponent,
    RewardsAdministrationStartComponent,
    AdminRewardsFirstPageComponent,
    AdminAllAwardsComponent,
    AdminEditComponent,
    AdminEditPageComponent,
    AdminAllPageComponent,
    AdminPointsComponent,
    AdminPointsPageComponent,
    AdminProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    PickerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
