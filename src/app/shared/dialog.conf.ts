/**
 * Dialog configuration
 */

export const QuestionDialogConf = {
  minWidth: '35%',
  maxWidth: '44%',
  position: { top: '6%' },
  data: {
    question: null,
    questionGroupId: null,
    surveyId: null,
    type: null,
    dialogConfig: {
      title: '',
      content: '',
      operation: '',
    },
  },
};

export const QuestionGroupDialogConf = {
  minWidth: '35%',
  maxWidth: '40%',
  position: { top: '6%' },
  data: {
    questionGroup: null,
    dialogConfig: {
      title: '',
      content: '',
      operation: ''
    }
  }
};

export const DeleteDialogConf = {
  minWidth: '20%',
  maxWidth: '25%',
  position: { top: '14%' },
  data: {
    item: null,
    dialogConfig: {
      title: '',
      content: ''
    },
  },
};
