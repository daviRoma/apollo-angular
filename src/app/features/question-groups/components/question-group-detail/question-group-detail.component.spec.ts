import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupDetailComponent } from './question-group-detail.component';

describe('QuestionGroupDetailComponent', () => {
  let component: QuestionGroupDetailComponent;
  let fixture: ComponentFixture<QuestionGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
