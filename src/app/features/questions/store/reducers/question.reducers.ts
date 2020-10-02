import { QuestionState, initialQuestionState, questionAdapter } from '../../../../state/question.state';
import { QuestionActionsAll, QuestionActionTypes } from '../actions/question.actions';

export function questionReducer(state = initialQuestionState, action: QuestionActionsAll): QuestionState {
  switch (action.type) {
    case QuestionActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case QuestionActionTypes.LOAD_SUCCESS: {

      return questionAdapter.setAll(dataTransform(action.payload.data), {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case QuestionActionTypes.LOAD_FAILURE: {
      return questionAdapter.removeAll({
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

function dataTransform(questions: any[]): any {
  return questions.map(
    (question) => ({
      ...question,
      options: question.options ? question.options.map(op => op.value) : null,
      elements: question.elements ? question.elements.map(el => el.title) : null,
      survey: parseInt(question.survey.split('/')[question.survey.split('/').length - 1], 0),
      questionGroup: parseInt(question.questionGroup.split('/')[question.questionGroup.split('/').length - 1], 0)
    })
  );
}
