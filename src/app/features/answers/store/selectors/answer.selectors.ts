import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AnswerState, answerAdapter } from '../../../../state/answer.state';
import { Answer } from '../../../../models/answer.model';
import { AppState } from '../../../../state/app.state';

export const {
  selectIds: _selectAnswerDataIds,
  selectEntities: _selectAnswerEntities,
  selectAll: _selectAllAnswer,
  selectTotal: _selectAnswerTotal,
} = answerAdapter.getSelectors();

export const selectAnswerState = createFeatureSelector<AnswerState>('answer');

export const selectAnswerIds = createSelector(
  selectAnswerState,
  _selectAnswerDataIds
);

export const selectAnswerEntities = createSelector(
  selectAnswerState,
  _selectAnswerEntities
);

export const selectAllAnswer = createSelector(
  selectAnswerState,
  _selectAllAnswer
);

export const selectAnswerError = createSelector(
  selectAnswerState,
  (state: AnswerState): boolean => state.error
);

export const selectAnswerLoading = createSelector(
  selectAnswerState,
  (state: AnswerState): boolean => state.loading
);

export const selectAnswerTotal = createSelector(
  selectAnswerState,
  (state: AnswerState): number => state.total
);

export const selectEntities = createSelector(
  selectAllAnswer,
  (entities) => entities
);

export const selectEntity = createSelector(
  selectAllAnswer,
  (entities, props) => entities.find((elem) => elem.id == props.id)
);

export const selectEntitiesBySurvey = createSelector(
  selectAllAnswer,
  (entities, props) => entities.filter((elem) => elem.survey == props.id)
);

export const selectEntitiesByType = createSelector(
  selectAllAnswer,
  (entities, props) => entities.filter((elem) => elem.type === props.type)
);

export const selectEntitiesByID = createSelector(
  selectAllAnswer,
  (entities, props) => props.ids.map((id) => entities[id])
);
