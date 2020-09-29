/**
 * Survey model
 */
import { QuestionGroup } from './question-group.model';
import { InvitationPool } from './invitation-pool.model';
import { User } from './user.model';
import { Icon } from './icon.model';
import { ApolloResponse } from './apollo-response.model';

export class Survey {
  id: number;
  name?: string;
  description?: string;
  secret: boolean;
  active: boolean;
  createDate: Date;
  startDate?: Date;
  endDate?: Date;
  urlId?: string;
  questionGroups?: QuestionGroup[];
  invitationPool?: InvitationPool;
  icon?: Icon;
  user?: User;
}

export class SurveyRequest {
  user_id?: number;
  filter?: string;
  page?: number;
  pag_size?: number;
  sortDirection?: string;
  sortField?: string;
  name?: string;
  start_date?: string;
  end_date?: string;
}

export class SurveyResponse extends ApolloResponse {}
