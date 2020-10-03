import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.state';

import * as fromAnswer from 'src/app/features/answers/store/selectors/answer.selectors';

@Component({
  selector: 'app-answer-stats',
  templateUrl: './answer-stats.component.html',
  styleUrls: ['./answer-stats.component.scss']
})
export class AnswerStatsComponent implements OnInit {


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.subscribe(select(fromAnswer.selectEntities))
  }

}
