import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './core/pages/todo-list/todo-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent },
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
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
