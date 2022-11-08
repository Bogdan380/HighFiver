import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionInputComponent } from './recognition-input.component';

describe('RecognitionInputComponent', () => {
  let component: RecognitionInputComponent;
  let fixture: ComponentFixture<RecognitionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognitionInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecognitionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
