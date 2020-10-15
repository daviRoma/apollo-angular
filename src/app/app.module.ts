import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

/* MATERIAL */
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LayoutsModule } from './layouts/layouts.module';
import { AuthModule } from './core/auth/auth.module';
import { AuthLayoutsModule } from 'src/app/core/auth/auth-components/auth-layouts.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthEffects } from 'src/app/core/auth/store/auth.effects';
import { SurveyEffects } from 'src/app/features/surveys/store/effects/survey.effects';
import { InvitationPoolEffects } from 'src/app/features/surveys/store/effects/invitation-pool.effects';
import { QuestionGroupEffects } from 'src/app/features/question-groups/store/question-group.effects';
import { UserEffects } from 'src/app/features/users/store/effects/user.effects';
import { QuestionEffects } from 'src/app/features/questions/store/effects/question.effects';
import { InputQuestionEffects } from 'src/app/features/questions/store/effects/input-question.effects';
import { ChoiceQuestionEffects } from 'src/app/features/questions/store/effects/choice-question.effects';
import { MatrixQuestionEffects } from 'src/app/features/questions/store/effects/matrix-questions.effects';
import { AnswerEffects } from 'src/app/features/answers/store/effects/answer.effects';
import { SurveyAnswerEffects } from 'src/app/features/answers/store/effects/survey-answer.effects';
import { InputQuestionAnswerEffects } from 'src/app/features/answers/store/effects/input-question-answer.effects';
import { ChoiceQuestionAnswerEffects } from 'src/app/features/answers/store/effects/choice-question-answer.effects';
import { MatrixQuestionAnswerEffects } from 'src/app/features/answers/store/effects/matrix-questions-answer.effects';

import { reducers } from 'src/app/state/app.state';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutsModule,
    AuthModule,
    AuthLayoutsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AuthEffects,
      SurveyEffects,
      InvitationPoolEffects,
      QuestionGroupEffects,
      UserEffects,
      QuestionEffects,
      InputQuestionEffects,
      ChoiceQuestionEffects,
      MatrixQuestionEffects,
      AnswerEffects,
      SurveyAnswerEffects,
      ChoiceQuestionAnswerEffects,
      InputQuestionAnswerEffects,
      MatrixQuestionAnswerEffects,
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  exports: [TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
