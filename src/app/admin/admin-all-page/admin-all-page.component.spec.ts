import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllPageComponent } from './admin-all-page.component';

describe('AdminAllPageComponent', () => {
  let component: AdminAllPageComponent;
  let fixture: ComponentFixture<AdminAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
