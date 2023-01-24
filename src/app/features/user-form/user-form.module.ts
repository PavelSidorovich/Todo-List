import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormRoutingModule } from './user-form-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { UserFormLayoutComponent } from './components/user-form-layout/user-form-layout.component';

@NgModule({
  declarations: [UserFormLayoutComponent],
  imports: [
    CommonModule,
    UserFormRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class UserFormModule {}
