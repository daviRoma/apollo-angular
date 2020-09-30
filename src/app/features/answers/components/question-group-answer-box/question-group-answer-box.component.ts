import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { QuestionGroup } from 'src/app/models/question-group.model';

@Component({
  selector: 'app-question-group-answer-box',
  templateUrl: './question-group-answer-box.component.html',
  styleUrls: ['./question-group-answer-box.component.scss']
})
export class QuestionGroupAnswerBoxComponent implements OnInit {

  @Input() questionGroups: QuestionGroup[];

  public group: QuestionGroup;
  private index = 0;


  constructor() {

  }

  ngOnInit(): void {

    console.log("Groups", this.questionGroups);
    this.group = this.questionGroups[0];

  }

  onNextGroup(): void{

    if(this.index < this.questionGroups.length-1){
      this.index++;
      this.group = this.questionGroups[this.index];
    }

  }

  onPreviousGroup(): void{

    if(this.index > 0){
      this.index--;
      this.group = this.questionGroups[this.index];
    }

  }

}
