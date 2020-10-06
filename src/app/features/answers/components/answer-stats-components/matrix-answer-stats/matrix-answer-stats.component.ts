import { Component, Input, OnInit } from '@angular/core';
import { DataAggregation } from 'src/app/models/data-aggregation.model';

@Component({
  selector: 'app-matrix-answer-stats',
  templateUrl: './matrix-answer-stats.component.html',
  styleUrls: ['./matrix-answer-stats.component.scss']
})
export class MatrixAnswerStatsComponent implements OnInit {

  @Input() data: DataAggregation;

  constructor() { }

  ngOnInit(): void {
  }

}
