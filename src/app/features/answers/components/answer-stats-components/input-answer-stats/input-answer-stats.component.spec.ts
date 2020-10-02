import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAnswerStatsComponent } from './input-answer-stats.component';

describe('InputAnswerStatsComponent', () => {
  let component: InputAnswerStatsComponent;
  let fixture: ComponentFixture<InputAnswerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAnswerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAnswerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
