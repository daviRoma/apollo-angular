import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixAnswerStatsComponent } from './matrix-answer-stats.component';

describe('MatrixAnswerStatsComponent', () => {
  let component: MatrixAnswerStatsComponent;
  let fixture: ComponentFixture<MatrixAnswerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixAnswerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixAnswerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
