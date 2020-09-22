import {
  QuestionState,
  initialQuestionState,
  questionAdapter,
} from '../../../../state/question.state';
import {
  ChoiceQuestionActionsAll,
  ChoiceQuestionActionTypes,
} from '../actions/choice-question.actions';

export function choiceQuestionReducer(
  state = initialQuestionState,
  action: ChoiceQuestionActionsAll
): QuestionState {
  switch (action.type) {
    case ChoiceQuestionActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case ChoiceQuestionActionTypes.LOAD_SUCCESS: {
      const questions = action.payload.data.map((question) => ({
        ...question,
      }));
      return questionAdapter.setAll(questions, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case ChoiceQuestionActionTypes.LOAD_FAILURE: {
      return questionAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }

    case ChoiceQuestionActionTypes.LOADONE_SUCCESS: {
      return questionAdapter.addOne({ ...action.payload.data }, { ...state });
    }

    case ChoiceQuestionActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case ChoiceQuestionActionTypes.NEW_FAILURE: {
      return state;
    }

    case ChoiceQuestionActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case ChoiceQuestionActionTypes.UPDATE_SUCCESS: {
      return questionAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state }
      );
    }
    case ChoiceQuestionActionTypes.UPDATE_FAILURE: {
      return state;
    }

    case ChoiceQuestionActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case ChoiceQuestionActionTypes.DELETE_SUCCESS: {
      return questionAdapter.removeOne(action.payload, { ...state });
    }
    case ChoiceQuestionActionTypes.DELETE_FAILURE: {
      return questionAdapter.setAll([], {
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
