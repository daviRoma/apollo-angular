import {
  AnswerState,
  initialAnswerState,
  answerAdapter,
} from '../../../../state/answer.state';
import { InputQuestionAnswerActionsAll, InputQuestionAnswerActionTypes } from '../actions/input-question-answer.actions';

export function inputQuestionAnswerReducer(
  state = initialAnswerState,
  action: InputQuestionAnswerActionsAll
): AnswerState {
  switch (action.type) {
    case InputQuestionAnswerActionTypes.LOADING: {
      return { ...state, loading: true };
    }
    case InputQuestionAnswerActionTypes.LOAD_SUCCESS: {
      const answers = action.payload.data.map((answer) => ({ ...answer }));
      return answerAdapter.setAll(answers, {
        ...state,
        error: false,
        loading: false,
        total: action.payload.data.length,
      });
    }
    case InputQuestionAnswerActionTypes.LOAD_FAILURE: {
      return answerAdapter.removeAll({
        ...state,
        error: true,
        loading: false,
        total: 0,
      });
    }

    case InputQuestionAnswerActionTypes.LOADONE_SUCCESS: {
      return answerAdapter.addOne(
        { ...action.payload.data },
        { ...state }
      );
    }

    case InputQuestionAnswerActionTypes.NEW: {
      return { ...state, loading: true };
    }
    case InputQuestionAnswerActionTypes.NEW_FAILURE: {
      return state;
    }

    case InputQuestionAnswerActionTypes.UPDATE: {
      return { ...state, loading: true };
    }
    case InputQuestionAnswerActionTypes.UPDATE_SUCCESS: {
      return answerAdapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        { ...state }
      );
    }
    case InputQuestionAnswerActionTypes.UPDATE_FAILURE: {
      return state;
    }

    case InputQuestionAnswerActionTypes.DELETE: {
      return { ...state, loading: true };
    }
    case InputQuestionAnswerActionTypes.DELETE_SUCCESS: {
      return answerAdapter.removeOne(action.payload, { ...state });
    }
    case InputQuestionAnswerActionTypes.DELETE_FAILURE: {
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
