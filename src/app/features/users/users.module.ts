import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPageComponent } from './components/users-page/users-page.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserService } from './services/user.service';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@NgModule({
  declarations: [UsersPageComponent, UserDetailsComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, SharedModule],
  providers: [UserService],
})
export class UsersModule {}
