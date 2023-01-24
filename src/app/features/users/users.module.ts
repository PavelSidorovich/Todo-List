import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersLayoutComponent } from './components/users-layout/users-layout.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserService } from './services/user.service';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsLayoutComponent } from './components/user-details-layout/user-details-layout.component';

@NgModule({
  declarations: [UsersLayoutComponent, UserDetailsLayoutComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, SharedModule],
  providers: [UserService],
})
export class UsersModule {}
