import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SurveyState, surveyAdapter } from '../../../../state/survey.state';
import { Survey } from 'src/app/models/survey.model';
import { AppState } from 'src/app/state/app.state';

export const {
  selectIds: _selectSurveyDataIds,
  selectEntities: _selectSurveyEntities,
  selectAll: _selectAllSurvey,
  selectTotal: _selectSurveyTotal
} = surveyAdapter.getSelectors();

export const selectSurveyState = createFeatureSelector<SurveyState>('survey');

export const selectSurveyIds = createSelector(
  selectSurveyState,
  _selectSurveyDataIds
);

export const selectSurveyEntities = createSelector(
  selectSurveyState,
  _selectSurveyEntities
);

export const selectAllSurvey = createSelector(
  selectSurveyState,
  _selectAllSurvey
);

export const selectSurveyError = createSelector(
  selectSurveyState,
  (state: SurveyState): boolean => state.error
);

export const selectSurveyLoading = createSelector(
  selectSurveyState,
  (state: SurveyState): boolean => state.loading
);

export const selectSurveyTotal = createSelector(
  selectSurveyState,
  (state: SurveyState): number => state.total
);

export const selectEntity = createSelector(
  selectAllSurvey,
  (entities, props) => entities.find((elem) => elem.id == props.id)
);

export const selectEntitiesByID = createSelector(
  selectAllSurvey,
  (entities, props) => props.ids.map((id) => entities[id])
);
