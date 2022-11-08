import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionDisplayComponent } from './recognition-display.component';

describe('RecognitionDisplayComponent', () => {
  let component: RecognitionDisplayComponent;
  let fixture: ComponentFixture<RecognitionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognitionDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecognitionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
