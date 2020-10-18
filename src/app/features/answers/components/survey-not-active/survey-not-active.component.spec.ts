import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyNotActiveComponent } from './survey-not-active.component';

describe('SurveyNotActiveComponent', () => {
  let component: SurveyNotActiveComponent;
  let fixture: ComponentFixture<SurveyNotActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyNotActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyNotActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
