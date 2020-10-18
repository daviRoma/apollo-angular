/**
 * Question State interface.
 */
import { Question } from '../models/question.model';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface QuestionState extends EntityState<Question>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const questionAdapter: EntityAdapter<Question> = createEntityAdapter<Question>({
  selectId: (question: Question) => question.id
});

export const initialQuestionState: QuestionState = questionAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});
