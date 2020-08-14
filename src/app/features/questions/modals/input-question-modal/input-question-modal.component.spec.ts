import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputQuestionModalComponent } from './input-question-modal.component';

describe('InputQuestionModalComponent', () => {
  let component: InputQuestionModalComponent;
  let fixture: ComponentFixture<InputQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputQuestionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
