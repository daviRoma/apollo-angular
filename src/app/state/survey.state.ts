/**
 * Survey State interface.
 */
import { Survey } from '../models/survey.model';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface SurveyState extends EntityState<Survey>{
  error: boolean;
  loading: boolean;
  total: number;
}

export const surveyAdapter: EntityAdapter<Survey> = createEntityAdapter<Survey>({
  selectId: (survey: Survey) => survey.id
});

export const initialSurveyState: SurveyState = surveyAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});
