import { AnswerParams, MultiAnswer, SingleAnswer, MatrixAnswer } from './answer.model';
/**
 * User Answer Model
 *
 * Completing a survey, answering all questions.
 */

import { ApolloResponse } from './apollo-response.model';
import { Question } from './question.model';

export class SurveyAnswer {
  id: number;
  email?: string;
  password?: string;
  survey?: any;
  answers?: QuestionAnswer[];
}

export class QuestionAnswer {
  id: number;
  question: Question;
  answers: any[];
}

export class SurveyAnswerRequest {
  surveyId: number;
  params: AnswerParams;
}

export class SurveyAnswerRespone extends ApolloResponse {}
