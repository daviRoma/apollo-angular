import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import { Survey } from 'src/app/models/survey.model';


@Component({
  selector: 'app-survey-overview',
  templateUrl: './survey-overview.component.html',
  styleUrls: ['./survey-overview.component.scss']
})
export class SurveyOverviewComponent implements OnInit {

  @Input() survey: Survey;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void { }

}
