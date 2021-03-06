import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, Subscription, merge } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';
import {
  selectAllUser,
  selectUserTotal,
  selectUserLoading,
  selectUserError,
} from 'src/app/features/users/store/selectors/user.selectors';

import {
  UserDeleteAction,
  UserLoadAction,
} from 'src/app/features/users/store/actions/user.actions';

import { DeleteUserComponent } from '../dialogs/delete-user/delete-user.component';

import { User, UserRequest } from 'src/app/models/user.model';
import { Paths } from 'src/app/shared/config/path.conf';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public user: User;
  public router: Router;

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
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    public confirmDialog: MatDialog,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.pageSize = 5;
  }

  ngOnInit(): void {
    this.store
      .select(fromAuth.selectAuthUser)
      .pipe(takeUntil(this.destroy))
      .subscribe((user: User) => {
        this.user = user;
        this.loadUsers();
    });

    this.displayedColumns = ['icon', 'username', 'email', 'action'];

    this.store
      .select(selectAllUser)
      .pipe(takeUntil(this.destroy))
      .subscribe((users) => this.initializeData(users));

    this.store
      .select(selectUserTotal)
      .pipe(takeUntil(this.destroy))
      .subscribe((total) => (this.userTotal = total));

    this.subscription.add(
      this.store
        .select(selectUserLoading)
        .pipe(takeUntil(this.destroy))
        .subscribe((loading) => {
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
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  public retry(): void {
    this.loadUsers();
  }

  private initializeData(users: User[]): void {
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

  public openDeleteDialog(userToDelete): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      minWidth: '20%',
      position: { top: '14%' },
      data: {
        user: { ...userToDelete }, // clone object
        dialogConfig: {
          title: 'Delete User',
          content: 'Are you sure to delete this User?',
        },
      },
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((response) => {
        if (response.result === 'close_after_delete') {
          // Delete action
          this.store.dispatch(new UserDeleteAction(userToDelete.id));
          this.router.navigateByUrl('users/administration/list');
        }
      })
    );
  }
}
