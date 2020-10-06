import { Component, Input, OnInit } from '@angular/core';

import { DataAggregation } from 'src/app/models/data-aggregation.model';

@Component({
  selector: 'app-input-answer-stats',
  templateUrl: './input-answer-stats.component.html',
  styleUrls: ['./input-answer-stats.component.scss']
})
export class InputAnswerStatsComponent implements OnInit {

  @Input() data: DataAggregation;

  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
