import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';
import * as fromAnswer from 'src/app/features/answers/store/selectors/answer.selectors';

import { Answer, AnswerRequest } from 'src/app/models/answer.model';
import { User } from 'src/app/models/user.model';

import { Paths } from 'src/app/shared/config/path.conf';
import { AnswerLoadAction } from '../../store/actions/answer.actions';


@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
})
export class AnswerListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // MatPaginator Output
  public pageEvent: PageEvent;

  public detailPage = Paths.survey.detail;
  public overviewPage = Paths.survey.overview;

  public dataSource: MatTableDataSource<Answer>;
  public selectionList: Answer[];
  public noData: Answer[] = [{} as Answer];
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
      'name',
      'status',
      'private',
      'createDate',
      'action',
    ];

    this.store
      .pipe(select(fromAnswer.selectAllAnswer))
      .subscribe((surveys) => this.initializeData(surveys));

    this.store
      .pipe(select(fromAnswer.selectAnswerTotal))
      .subscribe((total) => (this.answerTotal = total));

    this.subscription.add(
      this.store.pipe(select(fromAnswer.selectAnswerLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource(this.noData);
        }
        this.loading = loading;
      })
    );

    this.error$ = this.store.pipe(select(fromAnswer.selectAnswerError));
  }

  public ngAfterViewInit(): void {
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

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public retry(): void {
    this.loadAnswers();
  }


  private initializeData(answers: Answer[]): void {
    this.dataSource = new MatTableDataSource(answers.length ? answers : []);
  }

  private loadAnswers(): void {
    this.store.dispatch(
      new AnswerLoadAction({
        pageSize: this.paginator ? this.paginator.pageSize : 5
      } as AnswerRequest)
    );
  }
}
