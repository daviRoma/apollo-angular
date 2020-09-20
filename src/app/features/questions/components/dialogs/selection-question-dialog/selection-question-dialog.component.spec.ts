import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionQuestionDialogComponent } from './selection-question-dialog.component';

describe('SelectionQuestionDialogComponent', () => {
  let component: SelectionQuestionDialogComponent;
  let fixture: ComponentFixture<SelectionQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
