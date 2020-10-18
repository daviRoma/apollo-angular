import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceQuestionDialogComponent } from './choice-question-dialog.component';

describe('ChoiceQuestionDialogComponent', () => {
  let component: ChoiceQuestionDialogComponent;
  let fixture: ComponentFixture<ChoiceQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
