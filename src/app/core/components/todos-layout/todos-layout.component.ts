import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewContainerRef,
  ViewChild,
  OnInit,
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
  implements OnInit, OnDestroy
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

  public ngOnInit(): void {
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
        this.filteredTodos = todos;
        this._applyPagination();
        this._changeDetectorRef.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.fetchStatus = FetchStatus.ERROR;
        this.errorMsg = error.message;
      },
    });
  }

  public filterTodos(): void {
    this.filteredTodos = this._todos;
    this._applySearch();
    this._applyStatusFilter();
    this._applySorting();
    this._applyPagination();
    this._changeDetectorRef.detectChanges();
  }

  private _applySearch(): void {
    this.filteredTodos = this._todos.filter((todo) =>
      todo.title.includes(this._searchComponent.filterValue.toLowerCase())
    );
  }

  private _applyStatusFilter(): void {
    if (this.selectedStatus !== TodoStatus.ALL) {
      this.filteredTodos = this.filteredTodos.filter(
        (todo) =>
          todo.completed === (this.selectedStatus === TodoStatus.COMPLETED)
      );
    }
  }

  private _applySorting(): void {
    if (this.sortOption !== SortOption.NONE) {
      this.filteredTodos =
        this.sortOption === SortOption.ASC
          ? this.filteredTodos.sort()
          : this.filteredTodos.sort().reverse();
    }
  }

  private _applyPagination(): void {
    const firstIndexOfElement = this.page * this.size;
    const lastIndexOfElement = (this.page + 1) * this.size;

    this.totalTodos = this.filteredTodos.length;
    this.filteredTodos = this.filteredTodos.slice(
      firstIndexOfElement,
      lastIndexOfElement
    );
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
          this._changeDetectorRef.detectChanges();
        },
      });
  }

  public handlePageEvent(e: PageEvent): void {
    this.page = e.pageIndex;
    this.filterTodos();
  }
}
