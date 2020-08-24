/**
 * Survey model
 */
import { QuestionGroup } from './question-group.model';
import { InvitationPool } from './invitation-pool.model';
import { User } from './user.model';
import { Icon } from './icon.model';

export class Survey {
  id: string;
  name?: string;
  description?: string;
  secret: boolean;
  active: boolean;
  creationDate: Date;
  startDate?: Date;
  endDate?: Date;
  urlId?: string;
  questionGroups?: QuestionGroup[];
  invitationPool?: InvitationPool;
  icon?: Icon;
  user: User;
}

export class SurveyRequest {
  userId?: string;
  filter?: string;
  pageIndex?: number;
  pageSize?: number;
  sortDirection?: string;
  sortField?: string;
}

export class SurveyResponse {
  surveys: Survey[];
  status: number;
  message: string;
}