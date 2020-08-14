import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishSurveyComponent } from './publish-survey.component';

describe('PublishSurveyComponent', () => {
  let component: PublishSurveyComponent;
  let fixture: ComponentFixture<PublishSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
