import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Icon } from 'src/app/models/icon.model';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss'],
})
export class AdvancedComponent implements OnInit {

  @Input() mandatory: boolean;
  @Input() icon: Icon;

  @Output() advancedOptions = new EventEmitter();

  public file: File;
  public isError: boolean;
  public base64textString: string;

  constructor() {}

  ngOnInit(): void {}

  onMandatoryChange(event): void {
    console.log('Mandatory Change Event', event);
    this.advancedOptions.emit({ name: 'mandatory', value: event.target.value});
  }

  onFileChange(event): void {
    console.log('File Change Event', event);

    if (this.fileValidation(event.target.files[0])) {
      this.file = event.target.files[0];
      this.advancedOptions.emit({ name: 'file', value: this.file });
      this.isError = false;
    } else {
      this.isError = true;
    }
  }

  fileValidation(file: File): boolean {
    if (file.size <= 5000000 && (file.type.includes('png') || file.type.includes('jpg') || file.type.includes('jpeg'))) return true;
    return false;
  }

}
