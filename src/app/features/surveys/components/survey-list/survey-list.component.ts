import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

import { Store, select } from '@ngrx/store';
import { SurveyLoadAction } from 'src/app/features/surveys/store/actions/survey.actions';
import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';
import { AppState } from 'src/app/state/app.state';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';

/* COMPONENTS */
import { DeleteSurveyComponent } from 'src/app/features/surveys/components/dialogs/delete-survey/delete-survey.component';

import { Observable, Subject, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { Survey, SurveyRequest } from 'src/app/models/survey.model';

import { Paths } from 'src/app/shared/config/path.conf';
import { User } from 'src/app/models/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // MatPaginator Output
  public pageEvent: PageEvent;

  public detailPage = Paths.survey.detail;
  public overviewPage = Paths.survey.overview;

  public dataSource: MatTableDataSource<Survey>;
  public selectionList: Survey[];

  public surveyTotal: number;
  public isLoading: boolean;
  public isStart: boolean;

  public pageSizeOptions: number[];
  public pageSize: number;
  public pageIndex: number;

  public displayedColumns: string[];

  public error$: Observable<boolean>;
  public filterSubject = new Subject<string>();

  public filter: string;
  public defaultSort: Sort = { active: 'id', direction: 'asc' };

  private subscription: Subscription = new Subscription();
  private user: User;

  constructor(
    public confirmDialog: MatDialog,
    private store: Store<AppState>,
    private translate: TranslateService
  ) {
    this.isStart = true;
    this.pageSize = 5;
    this.pageSizeOptions = [5, 10, 20];
    this.displayedColumns = [
      'icon',
      'name',
      'status',
      'private',
      'createDate',
      'action',
    ];
  }

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.selectAuthUser)).subscribe((user: User) => {
      if (user) {
        this.user = user;
        if (this.isStart) {
          this.loadSurveys();
          this.isStart = false;
        }
      }
    });

    this.subscription.add(
      this.store
        .pipe(select(fromSurvey.selectSurveyLoading))
        .subscribe((loading) => {
          if (loading) {
            this.dataSource = new MatTableDataSource([]);
          } else {
            this.selectSurveys();
          }
          this.isLoading = loading;
        })
    );

    this.error$ = this.store.pipe(select(fromSurvey.selectSurveyError));
  }

  ngAfterViewInit(): void {
    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
    ); // we should reset page index

    let filter$ = this.filterSubject.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0; // we should reset page index
        this.filter = value;
      })
    );

    // merge all steams in one and dispatch loading action
    this.subscription.add(
      merge(filter$, sort$, this.paginator.page)
        .pipe(tap(() => this.loadSurveys()))
        .subscribe()
    );

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.complete();
  }

  openDeleteDialog(survey: Survey): void {
    const dialogRef = this.confirmDialog.open(DeleteSurveyComponent, {
      width: '30%',
      position: { top: '14%' },
      data: {
        item: { ...survey },
        dialogConfig: {
          title: this.translate.instant('survey.delete'),
          content: this.translate.instant('survey.deletemessage'),
        },
      },
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_delete') {
          this.paginator.pageIndex = 0;
          this.paginator.pageSize = 5;
          this.loadSurveys();
        }
      })
    );
  }

  private selectSurveys(): void {
    this.store
      .pipe(select(fromSurvey.selectAllSurvey))
      .subscribe((surveys: Survey[]) => {
        if (surveys.length) {
          this.initializeData(surveys);
        }
      });

    this.store
      .pipe(select(fromSurvey.selectSurveyTotal))
      .subscribe((total) => (this.surveyTotal = total));
  }

  private initializeData(surveys: Survey[]): void {
    this.dataSource = new MatTableDataSource(surveys.length ? surveys : []);
  }

  private loadSurveys(): void {
    const request = {
      user_id: this.user.id,
      page: this.paginator ? this.paginator.pageIndex + 1 : 1,
      pag_size: this.paginator ? this.paginator.pageSize : 5,
    } as SurveyRequest;

    if (this.filter && this.filter !== '')
      request.name = this.filter.toLocaleLowerCase();

    this.store.dispatch(new SurveyLoadAction(request));
  }
}
