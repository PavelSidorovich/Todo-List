import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from 'src/app/shared/interfaces/custom-http-response.interface';
import { Todo } from '../components/todos-layout/todo.interface';
import { TodoService } from '../services/todo.service';

@Injectable({ providedIn: 'root' })
export class PreTodoFetchResolver
  implements Resolve<Observable<CustomHttpResponse<Todo[]>>>
{
  constructor(private _todoService: TodoService) {}

  public resolve(): Observable<CustomHttpResponse<Todo[]>> {
    return this._todoService.fetchAll();
  }
}
