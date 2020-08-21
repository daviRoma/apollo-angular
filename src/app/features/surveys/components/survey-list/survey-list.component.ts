import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Store, select } from '@ngrx/store';
import { SurveyLoadAction } from 'src/app/features/surveys/store/actions/survey.actions';
import { selectAllSurvey, selectSurveyTotal, selectSurveyLoading, selectSurveyError } from 'src/app/features/surveys/store/selectors/survey.selectors';

/* COMPONENTS */
import { DeleteSurveyComponent } from 'src/app/features/surveys/components/dialogs/delete-survey/delete-survey.component';

import { Observable, Subject, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';

import { Survey, SurveyRequest } from 'src/app/models/survey.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public dataSource: MatTableDataSource<Survey>;
  public selectionList: Survey[];
  public noData: Survey[] = [{} as Survey];
  public surveyTotal: number;
  public loading: boolean;

  public pageConf: any;
  public pageSize: number;

  public displayedColumns: string[];

  public error$: Observable<boolean>;
  public filterSubject = new Subject<string>();

  public filter: string;
  public defaultSort: Sort = { active: 'id', direction: 'asc' };


  private subscription: Subscription = new Subscription();

  constructor(
    // public confirmDialog: MatDialog,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.displayedColumns = ['icon', 'name', 'status', 'private', 'creationDate', 'action'];
    this.pageSize = 5;
    this.store.pipe(select(selectAllSurvey)).subscribe(
      surveys => this.initializeData(surveys)
    );

    this.store.pipe(select(selectSurveyTotal)).subscribe(total => this.surveyTotal = total);

    this.subscription.add(this.store.pipe(
      select(selectSurveyLoading))
        .subscribe(loading => {
          if (loading) {
            this.dataSource = new MatTableDataSource(this.noData);
          }
          this.loading = loading;
        })
    );

    this.error$ = this.store.pipe(select(selectSurveyError));
  }

  // tslint:disable-next-line: use-lifecycle-interface
  public ngAfterViewInit(): void {
    let sort$ = this.sort.sortChange.pipe(tap(() => this.paginator.pageIndex = 0)); // we should reset page index

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
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public retry(): void {
    this.loadSurveys();
  }

  public openDeleteDialog(survey: Survey): void {
    // const dialogRef = this.confirmDialog.open(DeleteSurveyComponent, {
    //   minWidth: '19%',
    //   position: { top: '14%' },
    //   data: {
    //     meter: JSON.stringify(survey ? survey : this.selectionList) // clone object
    //   }
    // });

    // dialogRef.afterClosed().subscribe(
    //   response => {
    //     if (response.result === 'close_after_delete') {
    //       // this.assetsManagementService.deleteMeter(response.data.id).subscribe(
    //       //   (resp: boolean) => { this.getMeters(); },
    //       //   (error: any) => { console.log('ERROR', error);
    //       // });
    //     }
    //   });
  }

  private initializeData(surveys: Survey[]): void {
    this.dataSource = new MatTableDataSource(surveys.length ? surveys : []);
  }

  private loadSurveys(): void {
    this.store.dispatch(
      new SurveyLoadAction({
        survey: null,
        filter: this.filter.toLocaleLowerCase(),
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        sortDirection: this.sort.direction,
        sortField: this.sort.active
      } as SurveyRequest)
    );
}

}
