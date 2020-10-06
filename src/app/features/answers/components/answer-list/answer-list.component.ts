import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import * as fromAuth from 'src/app/core/auth/store/auth.selectors';
import * as fromSurveyAnswer from 'src/app/features/answers/store/selectors/survey-answer.selectors';
import * as fromQuestionGroup from 'src/app/features/question-groups/store/question-group.selectors';

import { SurveyAnswerLoadAction } from '../../store/actions/survey-answer.actions';

import { User } from 'src/app/models/user.model';
import { SurveyAnswer, SurveyAnswerRequest } from 'src/app/models/survey-answer.model';

import { Paths } from 'src/app/shared/config/path.conf';
import { QuestionGroupLoadAction } from 'src/app/features/question-groups/store/question-group.actions';


@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
})
export class AnswerListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() surveyId: number;

  // MatPaginator Output
  public pageEvent: PageEvent;

  public detailPage = Paths.survey.detail;
  public overviewPage = Paths.survey.overview;

  public dataSource: MatTableDataSource<SurveyAnswer>;
  public selectionList: SurveyAnswer[];
  public noData: SurveyAnswer[] = [{} as SurveyAnswer];
  public answerTotal: number;
  public loading: boolean;

  public pageSizeOptions: number[];
  public pageSize: number;

  public displayedColumns: string[];

  public error$: Observable<boolean>;
  public filterSubject = new Subject<string>();

  public filter: string;
  public defaultSort: Sort = { active: 'id', direction: 'asc' };

  private subscription: Subscription = new Subscription();
  private user: User;

  constructor(private store: Store<AppState>) {
    this.pageSize = 5;
    this.pageSizeOptions = [5, 10, 20];
  }

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.selectAuthUser)).subscribe((user: User) => {
      if (user) {
        this.user = user;
        this.loadAnswers();
      }
    });

    this.displayedColumns = [
      'icon',
      'id',
      'email',
      'totAnswers',
      'action',
    ];

    this.store
      .pipe(select(fromSurveyAnswer.selectAllSurveyAnswer))
      .subscribe((surveyAnswer) => this.initializeData(surveyAnswer));

    this.store
      .pipe(select(fromSurveyAnswer.selectSurveyAnswerTotal))
      .subscribe((total) => (this.answerTotal = total));

    this.subscription.add(
      this.store.pipe(select(fromSurveyAnswer.selectSurveyAnswerLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource(this.noData);
        }
        this.loading = loading;
      })
    );

    this.error$ = this.store.pipe(select(fromSurveyAnswer.selectSurveyAnswerError));
  }

  ngAfterViewInit(): void {
    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 1))
    ); // we should reset page index

    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 1; // we should reset page index
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
  getTotalQuestions(): number {

    return 10;
  }

  deleteSurveyAnswer(answer: SurveyAnswer): void {

  }

  private initializeData(answers: SurveyAnswer[]): void {
    console.log('ANSWERS', answers);

    if (answers.length) {
      this.store.dispatch(new QuestionGroupLoadAction(answers[0].survey));
    }

    this.dataSource = new MatTableDataSource(answers.length ? answers : []);
  }

  private loadAnswers(): void {
    this.store.dispatch( new SurveyAnswerLoadAction({
      params: {
        page: this.paginator ? this.paginator.pageIndex : 1,
        pag_size: this.paginator ? this.paginator.pageSize : 5,
      },
      surveyId: this.surveyId
    } as SurveyAnswerRequest));

  }
}
