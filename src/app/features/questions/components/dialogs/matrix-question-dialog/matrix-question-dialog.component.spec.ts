import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixQuestionDialogComponent } from './matrix-question-dialog.component';

describe('MatrixQuestionDialogComponent', () => {
  let component: MatrixQuestionDialogComponent;
  let fixture: ComponentFixture<MatrixQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
