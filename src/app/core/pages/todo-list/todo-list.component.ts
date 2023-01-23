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
import { FetchStatus } from '../../enums/fetch-status';
import { CommonComponent } from '../../../shared/components/generic/common-component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';

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
  todoSubsription: Subscription;
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
    this.todoSubsription.unsubscribe();
  }

  fetchTodos(): void {
    this.fetchStatus = FetchStatus.Loading;
    this.todoSubsription = this.todoService.fetchAll().subscribe({
      next: (todos: Todo[]) => {
        this.fetchStatus = FetchStatus.Completed;
        this.todos = todos;
        this.filterTodos();
      },
      error: (error: HttpErrorResponse) => {
        this.fetchStatus = FetchStatus.Error;
        this.errorMsg = error.message;
      },
    });
  }

  filterTodos(): void {
    const firstIndexOfElement = this.page * this.size;
    const lastIndexOfElement = (this.page + 1) * this.size;
    const filteredTodos = this.todos.filter((todo) =>
      todo.title.includes(this.searchComponent.filterValue.toLowerCase())
    );

    this.totalTodos = filteredTodos.length;
    this.filteredTodos = filteredTodos.slice(
      firstIndexOfElement,
      lastIndexOfElement
    );
    this.changeDetectorRef.detectChanges();
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
