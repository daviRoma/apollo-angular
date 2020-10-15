import { AnswerParams, MultiAnswer, SingleAnswer, MatrixSingleAnswer, MatrixMultiAnswer } from './answer.model';
/**
 * User Answer Model
 *
 * Completing a survey, answering all questions.
 */

import { ApolloResponse } from './apollo-response.model';
import { QuestionGroup } from './question-group.model';
import { Question } from './question.model';

export class SurveyAnswer {
  id: number;
  email?: string;
  password?: string;
  survey?: any;
  answers?: QuestionAnswer[];
  createDate?: Date;
  questionGroups?: QuestionGroup[];
}

export class QuestionAnswer {
  id: number;
  question: Question;
  answers: any[];
}

export class SurveyAnswerRequest {
  id?: number;
  surveyId: number;
  params: AnswerParams;
}

export class SurveyAnswerRespone extends ApolloResponse {}
