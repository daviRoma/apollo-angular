/**
 * Survey Answer State interface.
 */

import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { SurveyAnswer } from '../models/survey-answer.model';

export interface SurveyAnswerState extends EntityState<SurveyAnswer>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const surveyAnswerAdapter: EntityAdapter<SurveyAnswer> = createEntityAdapter<SurveyAnswer>({
  selectId: (surveyAnswer: SurveyAnswer) => surveyAnswer.id
});

export const initialSurveyAnswerState: SurveyAnswerState = surveyAnswerAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});
