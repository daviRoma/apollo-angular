import { Component, Input, OnInit } from '@angular/core';

import { DataAggregation } from 'src/app/models/data-aggregation.model';

@Component({
  selector: 'app-choice-answer-stats',
  templateUrl: './choice-answer-stats.component.html',
  styleUrls: ['./choice-answer-stats.component.scss']
})
export class ChoiceAnswerStatsComponent implements OnInit {

  @Input() data: DataAggregation;

  constructor() { }

  ngOnInit(): void {
  }

}
