import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPointsPageComponent } from './admin-points-page.component';

describe('AdminPointsPageComponent', () => {
  let component: AdminPointsPageComponent;
  let fixture: ComponentFixture<AdminPointsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPointsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPointsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
