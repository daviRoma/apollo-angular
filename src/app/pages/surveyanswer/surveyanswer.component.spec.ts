import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyanswerComponent } from './surveyanswer.component';

describe('SurveyanswerComponent', () => {
  let component: SurveyanswerComponent;
  let fixture: ComponentFixture<SurveyanswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyanswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyanswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
