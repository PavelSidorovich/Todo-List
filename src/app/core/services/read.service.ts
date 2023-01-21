import { Observable } from 'rxjs';

export interface ReadService<T> {
  fetchAll(): Observable<T>;
}
