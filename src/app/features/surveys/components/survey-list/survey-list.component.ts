import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

import { Store, select } from '@ngrx/store';
import { SurveyLoadAction, SurveyDeleteAction } from 'src/app/features/surveys/store/actions/survey.actions';
import { selectAllSurvey, selectSurveyTotal, selectSurveyLoading, selectSurveyError } from 'src/app/features/surveys/store/selectors/survey.selectors';
import { AppState } from 'src/app/state/app.state';
import { selectAuthState } from 'src/app/core/auth/store/auth.selectors';

/* COMPONENTS */
import { DeleteSurveyComponent } from 'src/app/features/surveys/components/dialogs/delete-survey/delete-survey.component';

import { Observable, Subject, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { Survey, SurveyRequest } from 'src/app/models/survey.model';

import { Paths } from 'src/app/shared/path.conf';
import { User } from 'src/app/models/user.model';

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

  public dataSource: MatTableDataSource<Survey>;
  public selectionList: Survey[];
  public noData: Survey[] = [{} as Survey];
  public surveyTotal: number;
  public loading: boolean;

  public pageSizeOptions: number[];
  public pageSize: number;

  public displayedColumns: string[];

  public error$: Observable<boolean>;
  public filterSubject = new Subject<string>();

  public filter: string;
  public defaultSort: Sort = { active: 'id', direction: 'asc' };

  private subscription: Subscription = new Subscription();
  private getState: Observable<any>;
  private user: User;

  constructor(public confirmDialog: MatDialog, private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.user = state.user;
    });

    this.displayedColumns = [
      'icon',
      'name',
      'status',
      'private',
      'creationDate',
      'action',
    ];
    this.pageSize = 5;
    this.store
      .pipe(select(selectAllSurvey))
      .subscribe((surveys) => this.initializeData(surveys));

    this.store
      .pipe(select(selectSurveyTotal))
      .subscribe((total) => (this.surveyTotal = total));

    this.subscription.add(
      this.store.pipe(select(selectSurveyLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource(this.noData);
        }
        this.loading = loading;
      })
    );

    this.error$ = this.store.pipe(select(selectSurveyError));
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
        .pipe(tap(() => this.loadSurveys()))
        .subscribe()
    );
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public retry(): void {
    this.loadSurveys();
  }


  public openDeleteDialog(survey: Survey): void {
    const dialogRef = this.confirmDialog.open(DeleteSurveyComponent, {
      minWidth: '20%',
      position: { top: '14%' },
      data: {
        survey: JSON.stringify(survey ? survey : this.selectionList), // clone object
        dialogConfig: {
          title: 'Delete Survey',
          content: 'Are you sure to delete the survey?',
        },
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response.result === 'close_after_delete') {
        // Delete action
        this.store.dispatch(new SurveyDeleteAction(survey.id));
        // this.assetsManagementService.deleteMeter(response.data.id).subscribe(
        //   (resp: boolean) => { this.getMeters(); },
        //   (error: any) => { console.log('ERROR', error);
        // });
      }
    });
  }

  private initializeData(surveys: Survey[]): void {
    this.dataSource = new MatTableDataSource(surveys.length ? surveys : []);
  }

  private loadSurveys(): void {
    this.store.dispatch(
      new SurveyLoadAction({
        userId: this.user.id,
        filter: this.filter.toLocaleLowerCase(),
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        sortDirection: this.sort.direction,
        sortField: this.sort.active
      } as SurveyRequest)
    );
  }
}
