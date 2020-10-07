import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SurveyAnswerState, surveyAnswerAdapter } from '../../../../state/survey-answer.state';


export const {
  selectIds: _selectSurveyAnswerIds,
  selectEntities: _selectSurveyAnswerEntities,
  selectAll: _selectAllSurveyAnswer,
  selectTotal: _selectSurveyAnswerTotal,
} = surveyAnswerAdapter.getSelectors();

export const selectAnswerState = createFeatureSelector<SurveyAnswerState>('surveyAnswer');

export const selectSurveyAnswerIds = createSelector(
  selectAnswerState,
  _selectSurveyAnswerIds
);

export const selectSurveyAnswerEntities = createSelector(
  selectAnswerState,
  _selectSurveyAnswerEntities
);

export const selectAllSurveyAnswer = createSelector(
  selectAnswerState,
  _selectAllSurveyAnswer
);

export const selectSurveyAnswerError = createSelector(
  selectAnswerState,
  (state: SurveyAnswerState): boolean => state.error
);

export const selectSurveyAnswerLoading = createSelector(
  selectAnswerState,
  (state: SurveyAnswerState): boolean => state.loading
);

export const selectSurveyAnswerTotal = createSelector(
  selectAnswerState,
  (state: SurveyAnswerState): number => state.total
);

export const selectEntities = createSelector(
  selectAllSurveyAnswer,
  (entities) => entities
);

export const selectEntity = createSelector(
  selectAllSurveyAnswer,
  (entities, props) => entities.find((elem) => elem.id == props.id)
);

export const selectEntityBySurvey = createSelector(
  selectAllSurveyAnswer,
  (entities, props) => entities.filter((elem) => elem.survey == props.id)
);

export const selectEntitiesByID = createSelector(
  selectAllSurveyAnswer,
  (entities, props) => props.ids.map((id) => entities[id])
);

export const selectAnswersByQuestion = createSelector(
  selectAllSurveyAnswer,
  (entities, props) => getAnswers(entities, props.id, props.type)
);


function getAnswers(surveyAnswers: any[], id: number, type: string): any {
  const answers = [];

  for (const surveyAnswer of surveyAnswers) {
    for (const answer of surveyAnswer.answers) {
      if (answer.question.questionType === type && answer.question.id == id) {
        answers.push(answer);
      }
    }
  }
  return answers;
}
