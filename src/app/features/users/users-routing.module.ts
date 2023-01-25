import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsLayoutComponent } from './components/user-details-layout/user-details-layout.component';
import { UsersLayoutComponent } from './components/users-layout/users-layout.component';

const routes: Routes = [
  { path: '', component: UsersLayoutComponent },
  { path: ':id', component: UserDetailsLayoutComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
