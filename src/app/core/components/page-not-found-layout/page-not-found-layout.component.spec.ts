import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundLayoutComponent } from './page-not-found-layout.component';

describe('PageNotFoundLayoutComponent', () => {
  let component: PageNotFoundLayoutComponent;
  let fixture: ComponentFixture<PageNotFoundLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
