import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationConfirmComponent } from './invitation-confirm.component';

describe('InvitationConfirmComponent', () => {
  let component: InvitationConfirmComponent;
  let fixture: ComponentFixture<InvitationConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
