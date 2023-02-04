import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../components/todos-layout/todo.interface';
import { Api } from 'src/app/shared/enums/api.enum';
import { RequestService } from 'src/app/shared/services/request.service';
import { ReadService } from 'src/app/shared/services/read.service.interface';
import { CustomHttpResponse } from 'src/app/shared/interfaces/custom-http-response.interface';
import { TodoCacheService } from './todo-cache.service';

@Injectable({ providedIn: 'root' })
export class TodoService extends RequestService implements ReadService<Todo> {
  private _url: string = Api.URL + 'todos';

  constructor(http: HttpClient, private _cacheService: TodoCacheService) {
    super(http);
  }

  public fetchAll(): Observable<CustomHttpResponse<Todo[]>> {
    if (this._cacheService.isExpired()) {
      this._cacheService.cachedResponse$ = this.get<Todo[]>(this._url).pipe(
        shareReplay(1)
      );
    }
    return this._cacheService.cachedResponse$;
  }
}
