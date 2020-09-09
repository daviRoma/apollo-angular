import { Component, OnInit } from '@angular/core';
import { User, UserRequest } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  UserLoadAction,
  UserDeleteAction,
} from 'src/app/features/users/store/actions/user.actions';
import { DeleteUserComponent } from 'src/app/features/users/components/dialogs/delete-user/delete-user.component';
import * as fromUser from 'src/app/features/users/store/selectors/user.selectors';
import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';
import { SurveyLoadAction } from 'src/app/features/surveys/store/actions/survey.actions';
import { SurveyRequest, Survey } from 'src/app/models/survey.model';
import {
  selectSurveyTotal,
  selectEntitiesByID,
} from 'src/app/features/surveys/store/selectors/survey.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-useroverview',
  templateUrl: './useroverview.component.html',
  styleUrls: ['./useroverview.component.scss'],
})
export class UseroverviewComponent implements OnInit {
  public user: User;
  routeParamsSubscription: any;

  public surveyTotal: number;
  public router: Router;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public dialog: MatDialog,
  ) {
    const self = this;
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      if (params.user_id) {
        // Select survey from store by url parameter
        self.loadData(params.user_id);
      }
    });
  }

  ngOnInit(): void {
    this.loadSurveys();

    this.store
      .pipe(select(selectSurveyTotal))
      .subscribe((total) => (this.surveyTotal = total));
  }

  public ngAfterViewInit(): void {}

  private loadSurveys(): void {
    this.store.dispatch(
      new SurveyLoadAction(({
        user_id: this.user.id,
      } as unknown) as SurveyRequest)
    );
  }

  private loadData(userId: string): void {
    this.store
      .pipe(select(fromUser.selectEntity, { id: userId }))
      .subscribe((user: User) => {
        if (user) {
          this.user = user;
        } else {
          this.store.dispatch(
            new UserLoadAction(({
              user_id: userId,
            } as unknown) as UserRequest)
          );
        }
      });
  }

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      minWidth: '20%',
      position: { top: '14%' },
      data: {
        user: { ...this.user }, // clone object
        dialogConfig: {
          title: 'Delete User',
          content: 'Are you sure to delete this User?',
        },
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response.result === 'close_after_delete') {
        // Delete action
        this.store.dispatch(new UserDeleteAction(this.user.id));
        this.router.navigateByUrl('users/administration/list');
      }
    });
  }
}
