import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupBoxComponent } from './question-group-box.component';

describe('QuestionGroupBoxComponent', () => {
  let component: QuestionGroupBoxComponent;
  let fixture: ComponentFixture<QuestionGroupBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
