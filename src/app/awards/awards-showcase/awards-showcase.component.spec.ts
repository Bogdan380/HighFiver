import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsShowcaseComponent } from './awards-showcase.component';

describe('AwardsShowcaseComponent', () => {
  let component: AwardsShowcaseComponent;
  let fixture: ComponentFixture<AwardsShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardsShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
