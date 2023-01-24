import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserControlRoutingModule } from './user-control-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [NewUserComponent],
  imports: [
    CommonModule,
    UserControlRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class UserControlModule {}
