import { Component, OnInit, Input, EventEmitter, Output, KeyValueDiffer, KeyValueDiffers, DoCheck, KeyValueChanges } from '@angular/core';
import { Icon, IconData } from 'src/app/models/icon.model';


@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss'],
})
export class AdvancedComponent implements OnInit, DoCheck {

  @Input() mandatory: boolean;
  @Input() icon: Icon;

  @Output() advancedOptions = new EventEmitter();

  public iconData: IconData;
  public file: File;
  public isError: boolean;

  private fileDiffer: KeyValueDiffer<string, any>;

  constructor(private differs: KeyValueDiffers) {}

  ngOnInit(): void {
    this.iconData = new IconData();
    this.fileDiffer = this.differs.find(this.iconData).create();
  }

  ngDoCheck(): void {
    const changes = this.fileDiffer.diff(this.iconData);
    if (changes) {
      this.fileChanged(changes);
    }
  }

  fileChanged(changes: KeyValueChanges<string, any>): void {
    if (this.iconData.base64 !== null) {
      this.advancedOptions.emit({ name: 'file', value: this.iconData });
    }
  }

  onMandatoryChange(event): void {
    this.advancedOptions.emit({ name: 'mandatory', value: Boolean(event.target.checked)});
  }

  onFileChange(event): void {
    if (this.fileValidation(event.target.files[0])) {
      this.file = event.target.files[0];
      this.iconData.file = this.file;
      this.fileEncoding(this.file);

      this.isError = false;
    } else {
      this.isError = true;
    }
  }

  fileValidation(file: File): boolean {
    if (file.size <= 5000000 && (file.type.includes('png') || file.type.includes('jpg') || file.type.includes('jpeg'))) return true;
    return false;
  }

  private fileEncoding(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleBase64Encoding.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  private handleBase64Encoding(event): void {
    const binaryString = event.target.result;
    this.iconData.base64 = btoa(binaryString);
  }

}
