import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificAwardComponent } from './specific-award.component';

describe('SpecificAwardComponent', () => {
  let component: SpecificAwardComponent;
  let fixture: ComponentFixture<SpecificAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificAwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
