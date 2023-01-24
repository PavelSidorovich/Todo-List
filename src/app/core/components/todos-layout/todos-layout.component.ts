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

  private _todos: Todo[] = [];
  private _todoSubscription: Subscription;
  @ViewChild('searchBar') private _searchComponent: SearchBarComponent;

  constructor(
    private _todoService: TodoService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _viewContainerRef: ViewContainerRef,
    private _modalService: ModalWindowService
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this._fetchTodos();
  }

  public ngOnDestroy(): void {
    this._todoSubscription.unsubscribe();
  }

  private _fetchTodos(): void {
    this.fetchStatus = FetchStatus.LOADING;
    this._todoSubscription = this._todoService.fetchAll().subscribe({
      next: (todos: Todo[]) => {
        this.fetchStatus = FetchStatus.COMPLETED;
        this._todos = todos;
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
    let filteredTodos = this._todos.filter((todo) =>
      todo.title.includes(this._searchComponent.filterValue.toLowerCase())
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
    this._changeDetectorRef.detectChanges();
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

    this._modalService
      .openModal(this._viewContainerRef, modalTitle, modalBody)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._todos = this._todos.filter((todo) => todo.id !== id);
          this.filterTodos();
        },
      });
  }

  public handlePageEvent(e: PageEvent): void {
    this.page = e.pageIndex;
    this.filterTodos();
  }
}
