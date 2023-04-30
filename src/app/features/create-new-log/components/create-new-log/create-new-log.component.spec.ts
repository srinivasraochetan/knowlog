import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewLogComponent } from './create-new-log.component';

describe('CreateNewLogComponent', () => {
  let component: CreateNewLogComponent;
  let fixture: ComponentFixture<CreateNewLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateNewLogComponent]
    });
    fixture = TestBed.createComponent(CreateNewLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
