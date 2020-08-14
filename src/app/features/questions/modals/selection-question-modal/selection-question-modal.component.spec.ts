import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionQuestionModalComponent } from './selection-question-modal.component';

describe('SelectionQuestionModalComponent', () => {
  let component: SelectionQuestionModalComponent;
  let fixture: ComponentFixture<SelectionQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionQuestionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
