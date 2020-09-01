import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationPoolComponent } from './invitation-pool.component';

describe('InvitationPoolComponent', () => {
  let component: InvitationPoolComponent;
  let fixture: ComponentFixture<InvitationPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
