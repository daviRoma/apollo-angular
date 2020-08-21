import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, concatMap  } from 'rxjs/operators';

/* SERVICES */
import { SurveyService } from '../../store/services/survey.service';

/* MODELS */
import { Survey } from '../../../../models/survey.model';

/**
 * See https://blog.angular-university.io/angular-material-data-table/
 */
export class SurveyListDataSource implements DataSource<Survey> {
    public isLoading: Observable<boolean>;
    public loadingData: boolean;

    public totalSurveys = 0;

    private surveySubject = new BehaviorSubject<Survey[]>([]); // emit empty array as first value
    private isLoadingSubject = new BehaviorSubject<boolean>(false); // emit false as first value

    constructor(
      private assetsManagementService: SurveyService
    ) {
      this.loadingData = true;
      this.isLoading = this.isLoadingSubject.asObservable();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Survey[]> {
      return this.surveySubject.asObservable();
    }

    public disconnect(collectionViewer: CollectionViewer): void {
      this.surveySubject.complete();
      this.isLoadingSubject.complete();
    }

    /**
     * Get Meters.
     */
    public getSurveys(request: Survey) {
        this.isLoadingSubject.next(true);

        this.assetsManagementService.getMeters(request)
          .pipe(
            catchError(() => of([])), // catch the error and return an Observable that emits the empty array
            finalize(() => {
              this.isLoadingSubject.next(false);  // whether success of false, emit false
            })
          ).subscribe(
            (response: any) => {
              this.totalMeters = response.counters.totalItemsFound;
              this.metersSubject.next(response.results);
              this.loadingData = false;
            },
            (error: any) => {
              console.log('ERROR ', error);
            }
          );
    }

    /**
     * Get meters that not belong to any project.
     */
    public getAssignableMeters(request: QueryHandleModel) {
      this.isLoadingSubject.next(true);

      this.assetsManagementService.getAssignableMeters(request)
        .pipe(
          catchError(() => of([])), // catch the error and return an Observable that emits the empty array
          finalize(() => {
            this.isLoadingSubject.next(false);  // whether success of false, emit false
          })
        ).subscribe(
          (response: any) => {
            this.totalMeters = response.counters.totalItemsFound;
            this.metersSubject.next(response.results);
            this.loadingData = false;
          },
          (error: any) => {
            console.log('ERROR ', error);
          }
        );
    }

    /**
     * Get meters that belong to a project.
     */
    public getProjectMeters(project_id: string, queryHandle?: QueryHandleModel) {
      this.isLoadingSubject.next(true);

      this.assetsManagementService.getMetersFromProject(project_id, queryHandle)
        .pipe(
          catchError(() => of([])), // catch the error and return an Observable that emits the empty array
          finalize(() => {
            this.isLoadingSubject.next(false);  // whether success of false, emit false
          })
        ).subscribe(
          (response: any) => {
            this.totalMeters = response.counters.totalItemsFound;
            this.metersSubject.next(response.results);
            this.loadingData = false;
          },
          (error: any) => {
            console.log('ERROR ', error);
          }
        );
    }

    public getData() {
      return this.metersSubject.getValue();
    }
}
