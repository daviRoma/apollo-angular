/**
 * Question Group State interface.
 */
import { QuestionGroup } from '../models/question-group.model';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface QuestionGroupState extends EntityState<QuestionGroup>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const questionGroupAdapter: EntityAdapter<QuestionGroup> = createEntityAdapter<QuestionGroup>({
  selectId: (questionGroup: QuestionGroup) => questionGroup.id
});

export const initialQuestionGroupState: QuestionGroupState = questionGroupAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});
