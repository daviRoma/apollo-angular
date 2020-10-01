import { createSelector, createFeatureSelector } from '@ngrx/store';
import { QuestionState, questionAdapter } from '../../../../state/question.state';
import { Question } from '../../../../models/question.model';
import { AppState } from '../../../../state/app.state';

export const {
  selectIds: _selectQuestionDataIds,
  selectEntities: _selectQuestionEntities,
  selectAll: _selectAllQuestion,
  selectTotal: _selectQuestionTotal,
} = questionAdapter.getSelectors();

export const selectQuestionState = createFeatureSelector<QuestionState>('question');

export const selectQuestionIds = createSelector(
  selectQuestionState,
  _selectQuestionDataIds
);

export const selectQuestionEntities = createSelector(
  selectQuestionState,
  _selectQuestionEntities
);

export const selectAllQuestion = createSelector(
  selectQuestionState,
  _selectAllQuestion
);

export const selectQuestionError = createSelector(
  selectQuestionState,
  (state: QuestionState): boolean => state.error
);

export const selectQuestionLoading = createSelector(
  selectQuestionState,
  (state: QuestionState): boolean => state.loading
);

export const selectQuestionTotal = createSelector(
  selectQuestionState,
  (state: QuestionState): number => state.total
);

export const selectEntities = createSelector(
  selectAllQuestion,
  (entities) => entities
);

export const selectEntity = createSelector(
  selectAllQuestion,
  (entities, props) => entities.find((elem) => elem.id === props.id)
);

export const selectEntitiesBySurvey = createSelector(
  selectAllQuestion,
  (entities, props) => entities.filter((elem) => elem.survey === props.id)
);

export const selectEntitiesByGroup = createSelector(
  selectAllQuestion,
  (entities, props) => entities.filter((elem) => elem.questionGroup === props.id)
);

export const selectEntitiesByType = createSelector(
  selectAllQuestion,
  (entities, props) => entities.filter((elem) => elem.type === props.type)
);

export const selectEntitiesByID = createSelector(
  selectAllQuestion,
  (entities, props) => props.ids.map((id) => entities[id])
);
