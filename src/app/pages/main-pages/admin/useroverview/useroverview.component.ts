import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { AppState } from '../../../../state/app.state';
import {
  UserDeleteAction,
  UserLoadOneAction,
} from 'src/app/features/users/store/actions/user.actions';
import { SurveyLoadAction } from 'src/app/features/surveys/store/actions/survey.actions';

import * as fromUser from 'src/app/features/users/store/selectors/user.selectors';
import * as fromSurvey from 'src/app/features/surveys/store/selectors/survey.selectors';

import { DeleteUserComponent } from 'src/app/features/users/components/dialogs/delete-user/delete-user.component';

import { SurveyRequest, Survey } from 'src/app/models/survey.model';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-useroverview',
  templateUrl: './useroverview.component.html',
  styleUrls: ['./useroverview.component.scss'],
})
export class UseroverviewComponent implements OnInit, OnDestroy {
  public user: User;

  public surveyTotal: number;
  public totalActiveSurveys: number;

  public isLoading: boolean;

  private router: Router;
  private routeParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public dialog: MatDialog,
  ) {
    const self = this;
    this.totalActiveSurveys = 0;
    this.surveyTotal = 0;
    this.isLoading = true;

    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      if (params.user_id) {
        // Select user from store
        self.loadUserWithSelectors(parseInt(params.user_id));
      }
    });
  }

  ngOnInit(): void {

    this.store
      .pipe(select(fromSurvey.selectSurveyTotal))
      .subscribe((total) => (this.surveyTotal = total));

    this.store
      .pipe(select(fromSurvey.selectAllSurvey))
      .subscribe((surveys: Survey[]) => {
        if (surveys) this.totalActiveSurveys = surveys.filter(survey => survey.active).length;
      });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
  }

  private loadUserWithSelectors(userId: number): void {
    this.store
      .pipe(select(fromUser.selectUserLoading))
      .subscribe((loading: boolean) => {
        if (!loading) {
          this.store
            .pipe(select(fromUser.selectEntity, { id: userId }))
            .subscribe((user: User) => {
              if (user) {
                this.user = user;
                this.loadSurveys();
              }
          });
          this.isLoading = false;
        } else {
          this.store.dispatch(new UserLoadOneAction(userId));
        }
      });
  }

  private loadSurveys(): void {
    this.store.dispatch(
      new SurveyLoadAction({user_id: this.user.id} as SurveyRequest)
    );
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
        this.router.navigateByUrl('/users/administration/list');
      }
    });
  }
}
