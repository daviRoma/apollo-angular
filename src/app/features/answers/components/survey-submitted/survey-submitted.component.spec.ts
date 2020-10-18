import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySubmittedComponent } from './survey-submitted.component';

describe('SurveySubmittedComponent', () => {
  let component: SurveySubmittedComponent;
  let fixture: ComponentFixture<SurveySubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
