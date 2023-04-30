import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeLogComponent } from './knowledge-log.component';

describe('KnowledgeLogComponent', () => {
  let component: KnowledgeLogComponent;
  let fixture: ComponentFixture<KnowledgeLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KnowledgeLogComponent]
    });
    fixture = TestBed.createComponent(KnowledgeLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
