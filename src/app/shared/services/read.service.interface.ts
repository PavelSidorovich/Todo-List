import { Observable } from 'rxjs';
import { CustomHttpResponse } from '../interfaces/custom-http-response.interface';

export interface ReadService<T> {
  fetchAll(): Observable<CustomHttpResponse<T[]>>;
}
