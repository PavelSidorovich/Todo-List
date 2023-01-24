import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../components/todos-layout/todo.interface';
import { CommonReadService } from './common-read.service';
import { Api } from 'src/app/shared/enums/api.enum';

@Injectable({ providedIn: 'root' })
export class TodoService extends CommonReadService<Todo> {
  url: string = Api.URL + 'todos';

  constructor(private http: HttpClient) {
    super();
  }

  fetchAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(catchError(this.handleError));
  }
}
