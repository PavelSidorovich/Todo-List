import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from 'src/app/shared/interfaces/custom-http-response.interface';
import { Todo } from '../components/todos-layout/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodoCacheService {
  private readonly _CACHE_EXPIRES_IN: number = 60;
  private _expires: Date;

  public cachedResponse$: Observable<CustomHttpResponse<Todo[]>>;

  public set response$(response: Observable<CustomHttpResponse<Todo[]>>) {
    const currentTime = new Date();
    this.cachedResponse$ = response;
    currentTime.setSeconds(currentTime.getSeconds() + this._CACHE_EXPIRES_IN);
    this._expires = currentTime;
  }

  public isExpired(): boolean {
    return new Date() > this._expires || this.cachedResponse$ === undefined;
  }
}
