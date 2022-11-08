import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPointsComponent } from './admin-points.component';

describe('AdminPointsComponent', () => {
  let component: AdminPointsComponent;
  let fixture: ComponentFixture<AdminPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
