import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixQuestionModalComponent } from './matrix-question-modal.component';

describe('MatrixQuestionModalComponent', () => {
  let component: MatrixQuestionModalComponent;
  let fixture: ComponentFixture<MatrixQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixQuestionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
