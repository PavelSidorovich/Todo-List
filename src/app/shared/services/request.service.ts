import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { CustomHttpResponse } from '../interfaces/custom-http-response.interface';

export class RequestService {
  constructor(private httpClient: HttpClient) {}

  public get<T>(
    url: string,
    queryParams?: any
  ): Observable<CustomHttpResponse<T>> {
    let params = new HttpParams();

    if (queryParams) {
      Object.entries<string | number | boolean>(queryParams).forEach((param) =>
        params.append(param[0], param[1])
      );
    }

    return this.httpClient.get<T>(url, { params: params }).pipe(
      map((res) => {
        return { data: res, statusCode: 200 } as CustomHttpResponse<T>;
      }),
      catchError((err: HttpErrorResponse) => {
        return of({
          statusCode: err.status,
          errorMsg: err.message,
        } as CustomHttpResponse<never>);
      })
    );
  }
}
