import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionGroupComponent } from './edit-question-group.component';

describe('EditQuestionGroupComponent', () => {
  let component: EditQuestionGroupComponent;
  let fixture: ComponentFixture<EditQuestionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuestionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
