import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {

  @Input() mandatory: boolean;
  @Input() file: any;

  constructor() { }

  ngOnInit(): void {
  }

  deleteFile(event): void {

  }

}
