import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllAwardsComponent } from './admin-all-awards.component';

describe('AdminAllAwardsComponent', () => {
  let component: AdminAllAwardsComponent;
  let fixture: ComponentFixture<AdminAllAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllAwardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
