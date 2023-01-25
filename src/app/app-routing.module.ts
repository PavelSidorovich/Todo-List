import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosLayoutComponent } from './core/components/todos-layout/todos-layout.component';
import { PageNotFoundLayoutComponent } from './core/components/page-not-found-layout/page-not-found-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodosLayoutComponent },
  {
    path: 'users/new',
    pathMatch: 'full',
    loadChildren: () =>
      import('./features/user-form/user-form.module').then(
        (m) => m.UserFormModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: '**',
    component: PageNotFoundLayoutComponent,
  },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
