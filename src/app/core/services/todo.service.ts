import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/api-constants';
import { Todo } from '../models/todo';
import { CommonReadService } from './common-read.service';

@Injectable({ providedIn: 'root' })
export class TodoService extends CommonReadService<Todo> {
  url: string = API.URL + 'todos';

  constructor(private http: HttpClient) {
    super();
  }

  fetchAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(catchError(this.handleError));
  }
}
