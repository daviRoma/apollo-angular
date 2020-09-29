/**
 * Question State interface.
 */
import { Answer } from '../models/answer.model';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface AnswerState extends EntityState<Answer>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const answerAdapter: EntityAdapter<Answer> = createEntityAdapter<Answer>({
  selectId: (answer: Answer) => answer.id
});

export const initialAnswerState: AnswerState = answerAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});
