import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Paths } from 'src/app/shared/path.conf';
import { MatTableDataSource } from '@angular/material/table';
import { Survey, SurveyRequest } from 'src/app/models/survey.model';
import { Observable, Subject, Subscription, merge, from } from 'rxjs';
import { User, UserRequest } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  selectAllUser,
  selectUserTotal,
  selectUserLoading,
  selectUserError,
} from 'src/app/features/users/store/selectors/user.selectors';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DeleteSurveyComponent } from 'src/app/features/surveys/components/dialogs/delete-survey/delete-survey.component';
import {
  UserDeleteAction,
  UserLoadAction,
} from 'src/app/features/users/store/actions/user.actions';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // MatPaginator Output
  public pageEvent: PageEvent;

  public detailPage = Paths.user.detail;

  public dataSource: MatTableDataSource<User>;
  public selectionList: User[];
  public noData: User[] = [{} as User];
  public userTotal: number;
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

  constructor(public confirmDialog: MatDialog, private store: Store<AppState>) {
    this.pageSize = 5;
  }

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.selectAuthUser)).subscribe((user: User) => {
      this.user = user;
      this.loadUsers();
    });

    this.displayedColumns = [
      'icon',
      'username',
      'email',
      'action',
    ];

    this.store
      .pipe(select(selectAllUser))
      .subscribe((users) => this.initializeData(users));

    this.store
      .pipe(select(selectUserTotal))
      .subscribe((total) => (this.userTotal = total));

    this.subscription.add(
      this.store.pipe(select(selectUserLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource(this.noData);
        }
        this.loading = loading;
      })
    );

    this.error$ = this.store.pipe(select(selectUserError));
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
        .pipe(tap(() => this.loadUsers()))
        .subscribe()
    );
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public retry(): void {
    this.loadUsers();
  }

  private initializeData(users: User[]): void {
    console.log('users', users);
    this.dataSource = new MatTableDataSource(users.length ? users : []);
  }

  private loadUsers(): void {
    this.store.dispatch(
      new UserLoadAction({
        page: this.paginator ? this.paginator.pageIndex : 1,
        pag_size: this.paginator ? this.paginator.pageSize : 5,
      } as UserRequest)
    );
  }
}
