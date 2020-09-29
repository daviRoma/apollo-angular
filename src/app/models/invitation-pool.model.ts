/**
 * Invitation Pool class
 */

export class InvitationPool {
  id: number;
  password?: string;
  emails?: string[];
}

export class InvitationPoolRequest {
  surveyId?: number;
  invitationPool?: InvitationPool;
}
