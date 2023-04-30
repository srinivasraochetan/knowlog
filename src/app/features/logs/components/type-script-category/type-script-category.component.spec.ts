import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeScriptCategoryComponent } from './type-script-category.component';

describe('TypeScriptCategoryComponent', () => {
  let component: TypeScriptCategoryComponent;
  let fixture: ComponentFixture<TypeScriptCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TypeScriptCategoryComponent]
    });
    fixture = TestBed.createComponent(TypeScriptCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
