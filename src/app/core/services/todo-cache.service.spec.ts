import { TestBed } from '@angular/core/testing';

import { TodoCacheService } from './todo-cache.service';

describe('TodoCacheService', () => {
  let service: TodoCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
