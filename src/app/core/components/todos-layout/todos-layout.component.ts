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

import { Todo } from './todo.interface';
import { TodoService } from '../../services/todo.service';
import { ModalWindowService } from '../../services/modal-window.service';
import { CommonComponent } from '../../../shared/components/generic/common-component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { MatSelectChange } from '@angular/material/select';
import { TodoStatus } from './todo-status.enum';
import { SortOption } from '../../../shared/enums/sort-option.enum';
import { FetchStatus } from 'src/app/shared/enums/fetch-status.enum';

@Component({
  selector: 'app-todos',
  templateUrl: './todos-layout.component.html',
  styleUrls: ['./todos-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosLayoutComponent
  extends CommonComponent
  implements OnDestroy, AfterViewInit
{
  public page: number = 0;
  public size: number = 20;
  public totalTodos: number = 0;
  public filteredTodos: Todo[] = [];
  public selectedStatus: TodoStatus = TodoStatus.ALL;
  public possibleTodoStatuses = TodoStatus;
  public sortOption: SortOption = SortOption.NONE;
  public possibleSortOptions = SortOption;

  private todos: Todo[] = [];
  private todoSubscription: Subscription;
  @ViewChild('searchBar') private searchComponent: SearchBarComponent;

  constructor(
    private todoService: TodoService,
    private changeDetectorRef: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalWindowService
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.fetchTodos();
  }

  public ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
  }

  private fetchTodos(): void {
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

  public filterTodos(): void {
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

  public selectedStatusChanged(selectedStatus: MatSelectChange): void {
    this.selectedStatus = selectedStatus.value;
    this.page = 0;
    this.filterTodos();
  }

  public sortOptionChanged(sortOption: MatSelectChange): void {
    this.sortOption = sortOption.value;
    this.filterTodos();
  }

  public changeStatus(id: number): void {
    this.filteredTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        return;
      }
    });
    this.filterTodos();
  }

  public deleteTodo(id: number): void {
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

  public handlePageEvent(e: PageEvent): void {
    this.page = e.pageIndex;
    this.filterTodos();
  }
}
