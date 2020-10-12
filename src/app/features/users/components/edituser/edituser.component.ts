import { Component, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { User, UserRequest } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { UserLoadAction, UserLoadOneAction, UserUpdateAction } from '../../store/actions/user.actions';
import * as fromAuth from 'src/app/core/auth/store/auth.selectors';
import { IconData } from 'src/app/models/icon.model';
import { LoadSessionUser } from 'src/app/core/auth/store/auth.actions';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss'],
})
export class EditUserComponent implements OnInit {
  public user: User;
  public editProfileForm: FormGroup;

  public iconData: IconData;
  public file: File;
  public isError: boolean;

  private isfileChanged = false;


  private fileDiffer: KeyValueDiffer<string, any>;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private differs: KeyValueDiffers



  ) {
    this.editProfileForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      newpassword: [''],
      passwordconfirm: [''],
      oldpassword: [''],
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.selectAuthUser)).subscribe((user: User) => {
      this.user = user;
      console.log('user in edit ', user);

      if (this.user) {
        this.editProfileForm.patchValue(this.user);
      }
    });

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
    console.log('changes', this.iconData);
    this.isfileChanged = true;
  }

  onFileChange(event): void {
    console.log('File Change Event', event);

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

  ngAfterInit(): void { }

  onSubmit(event): void {
    event.preventDefault();
    console.log('ProfileComponent', 'OnSubmit', this.editProfileForm.value);
    let payload: any
    if (this.isfileChanged) {
      payload = { ...this.editProfileForm.value, id: this.user.id, avatar: { data: this.iconData.base64, name: this.iconData.file.name } } as User;
    }
    else {
      payload = { ...this.editProfileForm.value, id: this.user.id } as User;
    }
    // Remove null attributes
    Object.keys(payload).forEach((key) => {
      if (payload[key] == null) delete payload[key];
    });
    this.store.dispatch(new UserUpdateAction(payload));


    this.store.dispatch(new LoadSessionUser())

  }

}
