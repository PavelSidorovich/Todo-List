import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { CommonReadService } from './common-read.service';
import { Api } from 'src/app/shared/constants/api.enum';

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
