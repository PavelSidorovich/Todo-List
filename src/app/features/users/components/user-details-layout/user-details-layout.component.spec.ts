import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsLayoutComponent } from './user-details-layout.component';

describe('UserDetailsLayoutComponent', () => {
  let component: UserDetailsLayoutComponent;
  let fixture: ComponentFixture<UserDetailsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
