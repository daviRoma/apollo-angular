import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { QuestionGroup } from 'src/app/models/question-group.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public survey: Survey;

  public questionGroups: QuestionGroup[];
  constructor() { }

  ngOnInit(): void {
  }

}
