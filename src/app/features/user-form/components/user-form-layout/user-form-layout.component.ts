import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './user-form-layout.component.html',
  styleUrls: ['./user-form-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormLayoutComponent {
  public dynamicFieldControl = this._formBuilder.control('');
  public userForm = this._formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: this._formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
    }),
    additional: this._formBuilder.group({}),
  });

  private _dynamicFields: Map<string, any> = new Map();

  constructor(private _formBuilder: FormBuilder) {}

  get name(): FormControl {
    return this.userForm.get('name') as FormControl;
  }

  get username(): FormControl {
    return this.userForm.get('username') as FormControl;
  }

  get street(): FormControl {
    return this.userForm.get('address')?.get('street') as FormControl;
  }

  get city(): FormControl {
    return this.userForm.get('address')?.get('city') as FormControl;
  }

  get email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  get additional(): FormGroup {
    return this.userForm.get('additional') as FormGroup;
  }

  public onSubmit(): void {
    console.log(this.userForm.getRawValue());
  }

  public addFormField(fieldName: string): void {
    if (!this._dynamicFields.has(fieldName)) {
      const formControl = this._formBuilder.control('', Validators.required);
      this._dynamicFields.set(fieldName, formControl);
      this.additional.addControl(fieldName, formControl);
      this.dynamicFieldControl.setValue('');
    }
  }

  public getAdditionalFieldNames(): string[] {
    return Array.from(this._dynamicFields.keys());
  }

  public getAdditionalControlByName(controlName: string): FormControl<any> {
    return this._dynamicFields.get(controlName);
  }
}
