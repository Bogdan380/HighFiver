import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRewardsFirstPageComponent } from './admin-rewards-first-page.component';

describe('AdminRewardsFirstPageComponent', () => {
  let component: AdminRewardsFirstPageComponent;
  let fixture: ComponentFixture<AdminRewardsFirstPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRewardsFirstPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRewardsFirstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
