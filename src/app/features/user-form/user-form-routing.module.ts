import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormLayoutComponent } from './components/user-form-layout/user-form-layout.component';

const routes: Routes = [{ path: '', component: UserFormLayoutComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserFormRoutingModule {}
