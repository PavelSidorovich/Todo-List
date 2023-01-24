import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class UserFormLayoutComponent implements OnInit {
  dynamicFields: Map<string, any> = new Map();
  dynamicFieldControl = this.formBuilder.control('');
  userForm = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
    }),
    additional: this.formBuilder.group({}),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

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

  onSubmit(): void {
    console.log(this.userForm.getRawValue());
  }

  addFormField(fieldName: string): void {
    if (!this.dynamicFields.has(fieldName)) {
      const formControl = this.formBuilder.control('', Validators.required);
      this.dynamicFields.set(fieldName, formControl);
      this.additional.addControl(fieldName, formControl);
      this.dynamicFieldControl.setValue('');
    }
  }

  getAdditionalFieldNames(): string[] {
    return Array.from(this.dynamicFields.keys());
  }

  getAdditionalControlByName(controlName: string): FormControl<any> {
    return this.dynamicFields.get(controlName);
  }
}
