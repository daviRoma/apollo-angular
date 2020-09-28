import { QuestionGroupState, initialQuestionGroupState, questionGroupAdapter } from '../../../state/question-group.state';
import { QuestionGroupActionsAll, QuestionGroupActionTypes } from './question-group.actions';

export function questionGroupReducer(state = initialQuestionGroupState, action: QuestionGroupActionsAll): QuestionGroupState {
  switch (action.type) {
    case QuestionGroupActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case QuestionGroupActionTypes.LOAD_SUCCESS: {
      const questionGroups = action.payload.data.map(
        (group) =>
          ({
            ...group,
            questions: dataTransform(group.questions.data),
            survey: parseInt(group.survey.split('/')[group.survey.split('/').length - 1], 0)
          })
        );
      return questionGroupAdapter.setAll(questionGroups, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case QuestionGroupActionTypes.LOAD_FAILURE: {
      return questionGroupAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }

    case QuestionGroupActionTypes.LOADONE_SUCCESS: {
      return questionGroupAdapter.updateOne(
        {
          id: action.payload.data.id,
          changes: {
            ...action.payload.data,
            questions: dataTransform(action.payload.data.questions.data),
            survey: parseInt(action.payload.data.survey.split('/')[action.payload.data.survey.split('/').length - 1], 0),
          },
        },
        { ...state }
      );
    }

    case QuestionGroupActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case QuestionGroupActionTypes.NEW_FAILURE: {
      return state;
    }

    case QuestionGroupActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case QuestionGroupActionTypes.UPDATE_SUCCESS: {
      return questionGroupAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state }
      );
    }
    case QuestionGroupActionTypes.UPDATE_FAILURE: {
      return state;
    }

    case QuestionGroupActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case QuestionGroupActionTypes.DELETE_SUCCESS: {
      return questionGroupAdapter.removeOne(action.payload, { ...state });
    }
    case QuestionGroupActionTypes.DELETE_FAILURE: {
      return questionGroupAdapter.setAll([], {
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
