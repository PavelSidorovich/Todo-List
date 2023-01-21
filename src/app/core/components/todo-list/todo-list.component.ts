import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewContainerRef,
} from '@angular/core';
import { debounceTime, fromEvent, map, Subscription, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { ModalWindowService } from '../../services/modal-window.service';
import { FetchStatus } from '../../enums/fetch-status';
import { CommonComponent } from '../generic/common-component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent
  extends CommonComponent
  implements OnInit, OnDestroy
{
  page: number = 0;
  size: number = 20;
  totalTodos: number = 0;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  todoNameFilter: string = '';
  todoSubsription: Subscription;
  filterSubscription: Subscription;

  constructor(
    private todoService: TodoService,
    private changeDetectorRef: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalWindowService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchTodos();

    const searchBox = document.querySelector('#search');
    if (searchBox) {
      const keyup$ = fromEvent(searchBox, 'keyup');

      this.filterSubscription = keyup$
        .pipe(
          map((v: any) => v.currentTarget.value),
          debounceTime(500)
        )
        .subscribe(() => this.filterTodos());
    }
  }

  ngOnDestroy(): void {
    this.todoSubsription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

  fetchTodos(): void {
    this.fetchStatus = FetchStatus.Loading;
    const todoObservable$ = this.todoService.fetchAll();

    this.todoSubsription = todoObservable$.subscribe({
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
      todo.title.includes(this.todoNameFilter.toLowerCase())
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

  clearSearch(): void {
    this.todoNameFilter = '';
    this.filterTodos();
  }
}
