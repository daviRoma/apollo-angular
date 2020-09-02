import { createSelector, createFeatureSelector } from '@ngrx/store';
import { QuestionGroupState, questionGroupAdapter } from '../../../state/question-group.state';
import { QuestionGroup } from '../../../models/question-group.model';
import { AppState } from '../../../state/app.state';

export const {
  selectIds: _selectQuestionGroupDataIds,
  selectEntities: _selectQuestionGroupEntities,
  selectAll: _selectAllQuestionGroup,
  selectTotal: _selectQuestionGroupTotal,
} = questionGroupAdapter.getSelectors();

export const selectQuestionGroupState = createFeatureSelector<QuestionGroupState>('questiongroup');

export const selectQuestionGroupIds = createSelector(
  selectQuestionGroupState,
  _selectQuestionGroupDataIds
);

export const selectQuestionGroupEntities = createSelector(
  selectQuestionGroupState,
  _selectQuestionGroupEntities
);

export const selectAllQuestionGroup = createSelector(
  selectQuestionGroupState,
  _selectAllQuestionGroup
);

export const selectQuestionGroupError = createSelector(
  selectQuestionGroupState,
  (state: QuestionGroupState): boolean => state.error
);

export const selectQuestionGroupLoading = createSelector(
  selectQuestionGroupState,
  (state: QuestionGroupState): boolean => state.loading
);

export const selectQuestionGroupTotal = createSelector(
  selectQuestionGroupState,
  (state: QuestionGroupState): number => state.total
);

export const selectEntity = createSelector(
  selectAllQuestionGroup,
  (entities, props) => entities.find((elem) => elem.id == props.id)
);

export const selectEntitiesBySurvey = createSelector(
  selectAllQuestionGroup,
  (entities, props) => entities.filter((elem) => elem.survey == props.id)
);

export const selectEntitiesByID = createSelector(
  selectAllQuestionGroup,
  (entities, props) => props.ids.map((id) => entities[id])
);
