import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretSurveyLoginComponent } from './secret-survey-login.component';

describe('SecretSurveyLoginComponent', () => {
  let component: SecretSurveyLoginComponent;
  let fixture: ComponentFixture<SecretSurveyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretSurveyLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretSurveyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
