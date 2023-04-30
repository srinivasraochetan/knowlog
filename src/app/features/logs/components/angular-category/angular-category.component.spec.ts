import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCategoryComponent } from './angular-category.component';

describe('AngularCategoryComponent', () => {
  let component: AngularCategoryComponent;
  let fixture: ComponentFixture<AngularCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularCategoryComponent]
    });
    fixture = TestBed.createComponent(AngularCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
