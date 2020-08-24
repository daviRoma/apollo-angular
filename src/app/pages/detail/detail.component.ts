import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public survey: Survey;

  constructor() { }

  ngOnInit(): void {
  }

}
