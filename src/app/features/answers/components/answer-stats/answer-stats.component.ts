import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';

import { QuestionAnswer, SurveyAnswer } from 'src/app/models/survey-answer.model';
import { ChoiceQuestion, InputQuestion, MatrixQuestion } from 'src/app/models/question.model';
import { DataAggregation } from 'src/app/models/data-aggregation.model';

@Component({
  selector: 'app-answer-stats',
  templateUrl: './answer-stats.component.html',
  styleUrls: ['./answer-stats.component.scss']
})
export class AnswerStatsComponent implements OnInit {

  @Input() surveyId: number;
  @Input() question: InputQuestion | ChoiceQuestion | MatrixQuestion;

  public dataAggregation: DataAggregation;

  private _questionAnswers: QuestionAnswer[];

  @Input() set questionAnswers(questionAnswers: QuestionAnswer[]) {
    if (questionAnswers) {
      this._questionAnswers = questionAnswers;
      this.aggregateData();
    }
  }

  get questionAnswers(): QuestionAnswer[] {
    return this._questionAnswers;
  }


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { }

  aggregateData(): void {
    switch (this.question.questionType) {
      case 'App\\MultiQuestion':
        this.aggregateChoiceAnswers();
        break;

      case 'App\\InputQuestion':
        this.aggregateInputAnswers();
        break;

      case 'App\\MatrixQuestion':
        this.aggregateMatrixAnswer();
        break;

      default:
        break;
    }
  }

  aggregateChoiceAnswers(): void {
    const choiceQuestion = { ...this.question } as ChoiceQuestion;
    this.dataAggregation = { options: [], other: '', total: 0 } as DataAggregation;

    choiceQuestion.options.forEach(elem => {
      this.dataAggregation.options.push({ label: elem.value, value: 0});
    });

    // Fill aggregation element
    let other = 0;
    for (const answer of this._questionAnswers) {
        answer.answers.forEach(elem => {
            const row = this.dataAggregation.options.find(item => item.label === elem);
            if (row !== undefined) {
                row.value += 1;
            } else {
                other += 1;
                this.dataAggregation.other += elem + ',';
            }
            this.dataAggregation.total += 1;
        });
    }

    if (choiceQuestion.other) this.dataAggregation.options.push({ label: 'Other', value: other });
    this.dataAggregation.other = this.dataAggregation.other.length ? this.dataAggregation.other.slice(0, -1) : null;

  }

  aggregateInputAnswers(): void {
    this.dataAggregation = { options: [], total: 0 } as DataAggregation;

    // Fill aggregation element
    for (const answer of this._questionAnswers) {
        if (this.dataAggregation.options.length) {
            const row = this.dataAggregation.options.find(item => item.label === answer.answers[0]);
            if (row !== undefined) {
                row.value += 1;
            } else {
                this.dataAggregation.options.push({ label: answer.answers[0], value: 1 });
            }
        } else {
            this.dataAggregation.options.push({ label: answer.answers[0], value: 1 });
        }

        this.dataAggregation.total += 1;
    }
  }

  aggregateMatrixAnswer(): void {
    const matrixQuestion = { ...this.question } as MatrixQuestion;
    this.dataAggregation = { elements: [], total: 0 } as DataAggregation;

    matrixQuestion.elements.forEach(elem => {
      this.dataAggregation.elements.push({
        name: elem.title,
        values: matrixQuestion.options.map(opt => ({label: opt.value, value: 0}))
      });
    });

    // Fill aggregation element
    for (const answer of this._questionAnswers) {
      for (const data of answer.answers) {
        this.dataAggregation.elements.forEach(elem => {

          if (data.element === elem.name) {
            elem.values.forEach(val => {
              data.answers.forEach(item => {
                if (item === val.label) {
                  val.value += 1
                  this.dataAggregation.total += 1;
                }
              });
            });
          }
        });
      }
    }
  }

}
