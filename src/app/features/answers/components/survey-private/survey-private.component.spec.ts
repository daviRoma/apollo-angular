import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPrivateComponent } from './survey-private.component';

describe('SurveyPrivateComponent', () => {
  let component: SurveyPrivateComponent;
  let fixture: ComponentFixture<SurveyPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
