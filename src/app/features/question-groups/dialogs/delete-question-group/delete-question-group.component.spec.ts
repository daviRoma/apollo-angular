import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionGroupComponent } from './delete-question-group.component';

describe('DeleteQuestionGroupComponent', () => {
  let component: DeleteQuestionGroupComponent;
  let fixture: ComponentFixture<DeleteQuestionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteQuestionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteQuestionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
