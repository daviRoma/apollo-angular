import { QuestionGroup } from "./question-group.model";

/**
 * Survey model
 */
import { QuestionGroup } from './question-group.model';
import { InvitationPool } from './invitation-pool.model';

export class Survey {
  id: string;
  name: string;
  description: string;
  secret: boolean;
  active: boolean;
  creationDate: Date;
  startDate: Date;
  endDate: Date;
  urlId: string;
  questionGroups: QuestionGroup[];
  invitationPool: InvitationPool;
}
