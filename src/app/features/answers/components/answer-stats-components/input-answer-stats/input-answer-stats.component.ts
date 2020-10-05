import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';

@Component({
  selector: 'app-input-answer-stats',
  templateUrl: './input-answer-stats.component.html',
  styleUrls: ['./input-answer-stats.component.scss']
})
export class InputAnswerStatsComponent implements OnInit {

  public answers: Answer[];
  public type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
