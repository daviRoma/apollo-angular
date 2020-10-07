import { SurveyAnswerState, initialSurveyAnswerState, surveyAnswerAdapter } from '../../../../state/survey-answer.state';
import { SurveyAnswerActionsAll, SurveyAnswerActionTypes } from '../actions/survey-answer.actions';
import { QuestionAnswer } from 'src/app/models/survey-answer.model';

export function surveyAnswerReducer(state = initialSurveyAnswerState, action: SurveyAnswerActionsAll): SurveyAnswerState {
  switch (action.type) {
    case SurveyAnswerActionTypes.LOADING: {
      return { ...state, loading: true };
    }

    case SurveyAnswerActionTypes.LOAD_SUCCESS: {
      return surveyAnswerAdapter.setAll(dataTransform(action.payload.data), {
        ...state,
        error: false,
        loading: false,
        total: action.payload.meta ? action.payload.meta.total : action.payload.data.length,

      });
    }

    case SurveyAnswerActionTypes.LOAD_FAILURE: {
      return surveyAnswerAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }

    default:
      return state;
  }

}

function dataTransform(surveyAnswers: any[]): any {
  return surveyAnswers.map(
    (surveyAnswer) => ({
      ...surveyAnswer,
      survey: parseInt(surveyAnswer.survey.split('/')[surveyAnswer.survey.split('/').length - 1], 0),
      answers: surveyAnswer.answers.map(
        answer => answerTransform(answer))
    })
  );
}

function answerTransform(answer: any): any {
  const resp = {
    id: answer.id,
    question: { id: null, questionType: null },
    answers: null
  } as QuestionAnswer;

  resp.question.id = parseInt(answer.question.split('/')[answer.question.split('/').length - 1], 0);

  switch (answer.question.split('/')[answer.question.split('/').length - 2]) {
    case 'matrix_questions':
      resp.question.questionType = 'App\\MatrixQuestion';
      resp.answers = answer.answersPair ? answer.answersPair : answer.answerPair;
      break;

    case 'input_questions':
      resp.question.questionType = 'App\\InputQuestion';
      resp.answers = [answer.answer];
      break;

    case 'multi_questions':
      resp.question.questionType = 'App\\MultiQuestion';
      resp.answers = answer.answers ? answer.answers : [answer.answer];
      break;

    default: break;
  }

  return resp;
}
