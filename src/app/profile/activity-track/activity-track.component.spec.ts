import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTrackComponent } from './activity-track.component';

describe('ActivityTrackComponent', () => {
  let component: ActivityTrackComponent;
  let fixture: ComponentFixture<ActivityTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
