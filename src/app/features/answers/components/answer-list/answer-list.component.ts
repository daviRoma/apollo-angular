import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';

import { SurveyAnswerLoadAction } from '../../store/actions/survey-answer.actions';

import { SurveyAnswer, SurveyAnswerRequest } from 'src/app/models/survey-answer.model';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { Survey } from 'src/app/models/survey.model';


@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
})
export class AnswerListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() survey: Survey;
  @Input() questionGroups: QuestionGroup[];

  // MatPaginator Output
  public pageEvent: PageEvent;

  public dataSource: MatTableDataSource<SurveyAnswer>;

  public answerTotal: number;
  public isLoading: boolean;

  public pageSizeOptions: number[];
  public pageSize: number;

  public displayedColumns: string[];

  public error$: Observable<boolean>;
  public filterSubject = new Subject<string>();

  public filter: string;
  public defaultSort: Sort = { active: 'id', direction: 'asc' };

  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {
    this.pageSize = 5;
    this.pageSizeOptions = [5, 10, 20];
    this.displayedColumns = [
      'id',
      'email',
      'questionGroups',
      'totAnswers',
      'createDate',
      'action',
    ];
  }

  ngOnInit(): void {

    this.loadAnswers();

    this.store
      .pipe(select(fromSurveyAnswer.selectAllSurveyAnswer))
      .subscribe((surveyAnswer) => this.initializeData(surveyAnswer));

    this.store
      .pipe(select(fromSurveyAnswer.selectSurveyAnswerTotal))
      .subscribe((total) => (this.answerTotal = total));

    this.subscription.add(
      this.store.pipe(select(fromSurveyAnswer.selectSurveyAnswerLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource([]);
        }
        this.isLoading = loading;
      })
    );

    this.error$ = this.store.pipe(select(fromSurveyAnswer.selectSurveyAnswerError));
  }

  ngAfterViewInit(): void {
    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
    ); // we should reset page index

    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0; // we should reset page index
        this.filter = value;
      })
    );

    // merge all steams in one and dispatch loading action
    this.subscription.add(
      merge(filter$, sort$, this.paginator.page)
        .pipe(tap(() => this.loadAnswers()))
        .subscribe()
    );
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  retry(): void {
    this.loadAnswers();
  }

  // TO DO: Get total questions
  getPercentageCompletition(totAnswers: number): string {
    return ((totAnswers / this.questionGroups.map(g => g.questions.length).reduce((g1, g2) => g1 + g2)) * 100).toFixed(2);
  }

  private initializeData(answers: SurveyAnswer[]): void {
    this.dataSource = new MatTableDataSource(answers.length ? answers.map( a => ({...a, questionGroups: this.questionGroups})) : []);
  }

  private loadAnswers(): void {
    this.store.dispatch( new SurveyAnswerLoadAction({
      params: {
        page: this.paginator ? (this.paginator.pageIndex + 1) : 1,
        pag_size: this.paginator ? this.paginator.pageSize : 5,
      },
      surveyId: this.survey.id
    } as SurveyAnswerRequest));

  }
}
