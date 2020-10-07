import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAlreadyAnsweredComponent } from './survey-already-answered.component';

describe('SurveyAlreadyAnsweredComponent', () => {
  let component: SurveyAlreadyAnsweredComponent;
  let fixture: ComponentFixture<SurveyAlreadyAnsweredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAlreadyAnsweredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAlreadyAnsweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
