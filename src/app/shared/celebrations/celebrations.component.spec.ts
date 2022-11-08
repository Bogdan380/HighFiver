import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebrationsComponent } from './celebrations.component';

describe('CelebrationsComponent', () => {
  let component: CelebrationsComponent;
  let fixture: ComponentFixture<CelebrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelebrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelebrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
