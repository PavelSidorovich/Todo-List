import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { CommonReadService } from 'src/app/core/services/common-read.service';
import { ReadService } from 'src/app/core/services/read.service';
import { Api } from 'src/app/shared/constants/api.enum';
import { User } from '../components/users-page/user.interface';

export interface IUserService extends ReadService<User> {
  fetchById(id: number): Observable<User>;
}

@Injectable()
export class UserService
  extends CommonReadService<User>
  implements IUserService
{
  url: string = Api.URL + 'users';

  constructor(private http: HttpClient) {
    super();
  }

  fetchById(id: number): Observable<User> {
    return this.http
      .get<User>(this.url + `/${id}`)
      .pipe(catchError(this.handleError));
  }

  fetchAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(catchError(this.handleError));
  }
}
