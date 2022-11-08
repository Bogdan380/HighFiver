import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsAdministrationStartComponent } from './rewards-administration-start.component';

describe('RewardsAdministrationStartComponent', () => {
  let component: RewardsAdministrationStartComponent;
  let fixture: ComponentFixture<RewardsAdministrationStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsAdministrationStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsAdministrationStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
