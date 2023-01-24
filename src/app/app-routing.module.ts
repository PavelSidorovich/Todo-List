import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosLayoutComponent } from './core/components/todos-layout/todos-layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodosLayoutComponent },
  {
    path: 'users/new',
    pathMatch: 'full',
    loadChildren: () =>
      import('./features/user-control/user-control.module').then(
        (m) => m.UserControlModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
