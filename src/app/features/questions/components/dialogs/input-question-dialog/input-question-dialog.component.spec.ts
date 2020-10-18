import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputQuestionDialogComponent } from './input-question-dialog.component';

describe('InputQuestionDialogComponent', () => {
  let component: InputQuestionDialogComponent;
  let fixture: ComponentFixture<InputQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
