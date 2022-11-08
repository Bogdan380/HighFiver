import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificAwardPageComponent } from './specific-award-page.component';

describe('SpecificAwardPageComponent', () => {
  let component: SpecificAwardPageComponent;
  let fixture: ComponentFixture<SpecificAwardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificAwardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificAwardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
