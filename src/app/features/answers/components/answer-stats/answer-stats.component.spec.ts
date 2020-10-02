import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerStatsComponent } from './answer-stats.component';

describe('AnswerStatsComponent', () => {
  let component: AnswerStatsComponent;
  let fixture: ComponentFixture<AnswerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
