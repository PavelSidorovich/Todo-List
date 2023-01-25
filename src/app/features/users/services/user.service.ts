import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ReadService } from 'src/app/shared/services/read.service.interface';
import { Api } from 'src/app/shared/enums/api.enum';
import { User } from '../components/users-layout/user.interface';
import { RequestService } from 'src/app/shared/services/request.service';
import { CustomHttpResponse } from 'src/app/shared/interfaces/custom-http-response.interface';

export interface IUserService extends ReadService<User> {
  fetchById(id: number): Observable<User>;
}

@Injectable()
export class UserService extends RequestService implements ReadService<User> {
  url: string = Api.URL + 'users';

  constructor(http: HttpClient) {
    super(http);
  }

  fetchById(id: number): Observable<CustomHttpResponse<User>> {
    return this.get<User>(this.url + `/${id}`);
  }

  fetchAll(): Observable<CustomHttpResponse<User[]>> {
    return this.get<User[]>(this.url);
  }
}
