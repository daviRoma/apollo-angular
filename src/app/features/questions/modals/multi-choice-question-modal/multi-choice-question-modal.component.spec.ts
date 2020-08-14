import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoiceQuestionModalComponent } from './multi-choice-question-modal.component';

describe('MultiChoiceQuestionModalComponent', () => {
  let component: MultiChoiceQuestionModalComponent;
  let fixture: ComponentFixture<MultiChoiceQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiChoiceQuestionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiChoiceQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
