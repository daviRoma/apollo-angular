/**
 * Dialog configuration
 */

const dialogConfig = {
  title: '',
  content: '',
  operation: ''
};

export const SurveyDialogConf = {
  minWidth: '40%',
  maxWidth: '50%',
  position: { top: '2%' },
  data: {
    survey: null,
    dialogConfig
  },
};

export const QuestionDialogConf = {
  minWidth: '35%',
  maxWidth: '44%',
  position: { top: '6%' },
  data: {
    question: null,
    questionGroupId: null,
    surveyId: null,
    type: null,
    dialogConfig
  },
};

export const QuestionGroupDialogConf = {
  minWidth: '35%',
  maxWidth: '40%',
  position: { top: '6%' },
  data: {
    questionGroup: null,
    dialogConfig
  }
};

export const DeleteDialogConf = {
  minWidth: '20%',
  maxWidth: '25%',
  position: { top: '14%' },
  data: {
    item: null,
    dialogConfig
  },
};

export const AccesSecretSurveyDialogConf = {
  minWidth: '40%',
  maxWidth: '60%',
  position: { top: '14%' },
  data: {
    invitationPool: null,
    surveyAnswers: null,
    dialogConfig
  },
};

export const CloseSurveyAnswerDialogConf = {
  minWidth: '40%',
  maxWidth: '60%',
  minHeight: "40%",
  position: { top: '14%' },
  data: {
    dialogConfig
  },
};

