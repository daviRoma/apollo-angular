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
  creation_date: Date;
  start_date?: Date;
  end_date?: Date;
  url_id?: string;
  question_groups?: QuestionGroup[];
  invitation_pool?: InvitationPool;
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

export class SurveyResponse {
  data?: Survey[];
  links?: any;
  meta?: any;
}
