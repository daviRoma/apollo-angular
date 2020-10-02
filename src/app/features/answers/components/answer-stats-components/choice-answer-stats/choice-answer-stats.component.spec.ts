import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceAnswerStatsComponent } from './choice-answer-stats.component';

describe('ChoiceAnswerStatsComponent', () => {
  let component: ChoiceAnswerStatsComponent;
  let fixture: ComponentFixture<ChoiceAnswerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceAnswerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceAnswerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
