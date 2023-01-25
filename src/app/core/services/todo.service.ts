import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../components/todos-layout/todo.interface';
import { Api } from 'src/app/shared/enums/api.enum';
import { RequestService } from 'src/app/shared/services/request.service';
import { ReadService } from 'src/app/shared/services/read.service.interface';
import { CustomHttpResponse } from 'src/app/shared/interfaces/custom-http-response.interface';

@Injectable({ providedIn: 'root' })
export class TodoService extends RequestService implements ReadService<Todo> {
  url: string = Api.URL + 'todos';

  constructor(http: HttpClient) {
    super(http);
  }

  fetchAll(): Observable<CustomHttpResponse<Todo[]>> {
    return this.get<Todo[]>(this.url);
  }
}
