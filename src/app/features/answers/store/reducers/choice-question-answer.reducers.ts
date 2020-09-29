import {
  AnswerState,
  initialAnswerState,
  answerAdapter,
} from '../../../../state/answer.state';
import {
  ChoiceQuestionAnswerActionsAll,
  ChoiceQuestionAnswerActionTypes,
} from '../actions/choice-question-answer.actions';

export function choiceQuestionReducer(
  state = initialAnswerState,
  action: ChoiceQuestionAnswerActionsAll
): AnswerState {
  switch (action.type) {
    case ChoiceQuestionAnswerActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case ChoiceQuestionAnswerActionTypes.LOAD_SUCCESS: {
      const answers = action.payload.data.map((answer) => ({
        ...answer,
      }));
      return answerAdapter.setAll(answers, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case ChoiceQuestionAnswerActionTypes.LOAD_FAILURE: {
      return answerAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }

    case ChoiceQuestionAnswerActionTypes.LOADONE_SUCCESS: {
      return answerAdapter.addOne({ ...action.payload.data }, { ...state });
    }

    case ChoiceQuestionAnswerActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case ChoiceQuestionAnswerActionTypes.NEW_FAILURE: {
      return state;
    }

    case ChoiceQuestionAnswerActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case ChoiceQuestionAnswerActionTypes.UPDATE_SUCCESS: {
      return answerAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state }
      );
    }
    case ChoiceQuestionAnswerActionTypes.UPDATE_FAILURE: {
      return state;
    }

    case ChoiceQuestionAnswerActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case ChoiceQuestionAnswerActionTypes.DELETE_SUCCESS: {
      return answerAdapter.removeOne(action.payload, { ...state });
    }
    case ChoiceQuestionAnswerActionTypes.DELETE_FAILURE: {
      return answerAdapter.setAll([], {
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
