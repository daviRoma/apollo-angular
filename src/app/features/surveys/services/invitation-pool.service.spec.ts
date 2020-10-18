import { TestBed } from '@angular/core/testing';

import { InvitationPoolService } from './invitation-pool.service';

describe('InvitationPoolService', () => {
  let service: InvitationPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitationPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
