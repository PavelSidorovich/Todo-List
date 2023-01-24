import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewContainerRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Subscription, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { ModalWindowService } from '../../services/modal-window.service';
import { CommonComponent } from '../../../shared/components/generic/common-component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { MatSelectChange } from '@angular/material/select';
import { TodoStatus } from './todo-status.enum';
import { SortOption } from '../../../shared/constants/sort-option.enum';
import { FetchStatus } from 'src/app/shared/constants/fetch-status.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent
  extends CommonComponent
  implements OnDestroy, AfterViewInit
{
  page: number = 0;
  size: number = 20;
  totalTodos: number = 0;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  selectedStatus: TodoStatus = TodoStatus.ALL;
  possibleTodoStatuses = TodoStatus;
  sortOption: SortOption = SortOption.NONE;
  possibleSortOptions = SortOption;
  todoSubscription: Subscription;
  @ViewChild('searchBar') searchComponent: SearchBarComponent;

  constructor(
    private todoService: TodoService,
    private changeDetectorRef: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalWindowService
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.fetchTodos();
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
  }

  fetchTodos(): void {
    this.fetchStatus = FetchStatus.LOADING;
    this.todoSubscription = this.todoService.fetchAll().subscribe({
      next: (todos: Todo[]) => {
        this.fetchStatus = FetchStatus.COMPLETED;
        this.todos = todos;
        this.filterTodos();
      },
      error: (error: HttpErrorResponse) => {
        this.fetchStatus = FetchStatus.ERROR;
        this.errorMsg = error.message;
      },
    });
  }

  filterTodos(): void {
    const firstIndexOfElement = this.page * this.size;
    const lastIndexOfElement = (this.page + 1) * this.size;
    let filteredTodos = this.todos.filter((todo) =>
      todo.title.includes(this.searchComponent.filterValue.toLowerCase())
    );

    if (this.selectedStatus !== TodoStatus.ALL) {
      filteredTodos = filteredTodos.filter(
        (todo) =>
          todo.completed === (this.selectedStatus === TodoStatus.COMPLETED)
      );
    }
    if (this.sortOption !== SortOption.NONE) {
      filteredTodos =
        this.sortOption === SortOption.ASC
          ? filteredTodos.sort()
          : filteredTodos.sort().reverse();
    }

    this.totalTodos = filteredTodos.length;
    this.filteredTodos = filteredTodos.slice(
      firstIndexOfElement,
      lastIndexOfElement
    );
    this.changeDetectorRef.detectChanges();
  }

  selectedStatusChanged(selectedStatus: MatSelectChange): void {
    this.selectedStatus = selectedStatus.value;
    this.page = 0;
    this.filterTodos();
  }

  sortOptionChanged(sortOption: MatSelectChange): void {
    this.sortOption = sortOption.value;
    this.filterTodos();
  }

  changeStatus(id: number) {
    this.filteredTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        return;
      }
    });
    this.filterTodos();
  }

  deleteTodo(id: number): void {
    const modalTitle = 'Delete confirmation';
    const modalBody = 'Do you really want to delete todo?';

    this.modalService
      .openModal(this.viewContainerRef, modalTitle, modalBody)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.todos = this.todos.filter((todo) => todo.id !== id);
          this.filterTodos();
        },
      });
  }

  handlePageEvent(e: PageEvent): void {
    this.page = e.pageIndex;
    this.filterTodos();
  }
}
