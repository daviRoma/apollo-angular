/**
 * Survey model
 */
import { QuestionGroup } from './question-group.model';
import { InvitationPool } from './invitation-pool.model';
import { User } from './user.model';

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
  user: User;
}

export class SurveyRequest {
  survey: Survey;
  filter: string;
  pageIndex: number;
  pageSize: number;
  sortDirection: string;
  sortField: string;
}

export class SurveyResponse {
  surveys: Survey[];
  status: number;
  message: string;
}
