import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss'],
})
export class AdvancedComponent implements OnInit {
  @Input() mandatory: boolean;
  @Input() file: File;

  @Output() advancedOptions = new EventEmitter();

  public outputObject: any;
  public isError: boolean;
  public base64textString: string;

  constructor() {
    this.outputObject = { mandatory: this.mandatory, file: this.file };
  }

  ngOnInit(): void {}

  onMandatoryChange(event): void {
    console.log('Mandatory Change Event', event);
    this.outputObject.mandatory = event.target.value;
    this.advancedOptions.emit(this.outputObject);
  }

  onFileChange(event): void {
    console.log('File Change Event', event);
    if (this.fileValidation(event.target.files[0])) {
      this.file = event.target.files[0];
      this.advancedOptions.emit({ ...this.outputObject, file: this.fileEncoding(this.file) });
      this.isError = false;
    } else {
      this.isError = true;
    }
  }

  fileValidation(file: File): boolean {
    if (file.size <= 5000000 && (file.type.includes('png') || file.type.includes('jpg') || file.type.includes('jpeg'))) return true;
    return false;
  }

  fileEncoding(file: File): string {
    let base64textString = '';
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        base64textString = reader.result.toString();
      };
      return base64textString;
    }
    return null;
  }

}
