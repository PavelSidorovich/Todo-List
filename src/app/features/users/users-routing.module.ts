import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersPageComponent } from './components/users-page/users-page.component';

const routes: Routes = [
  { path: '', component: UsersPageComponent },
  { path: ':id', component: UserDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
