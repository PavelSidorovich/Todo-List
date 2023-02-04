import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewContainerRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { Todo } from './todo.interface';
import { ModalWindowService } from '../../services/modal-window.service';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { MatSelectChange } from '@angular/material/select';
import { TodoStatus } from './todo-status.enum';
import { SortOption } from '../../../shared/enums/sort-option.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos-layout.component.html',
  styleUrls: ['./todos-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosLayoutComponent implements OnInit, OnDestroy {
  public page: number = 0;
  public size: number = 20;
  public totalTodos: number = 0;
  public filteredTodos: Todo[] = [];
  public selectedStatus: TodoStatus = TodoStatus.ALL;
  public possibleTodoStatuses = TodoStatus;
  public sortOption: SortOption = SortOption.NONE;
  public possibleSortOptions = SortOption;
  public isLoading: boolean = false;
  public errorMsg: string = '';

  private _todos: Todo[] = [];
  private _cleanUp$ = new Subject<void>();
  @ViewChild('searchBar') private _searchComponent: SearchBarComponent;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _viewContainerRef: ViewContainerRef,
    private _modalService: ModalWindowService,
    private _route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this._processTodos();
  }

  public ngOnDestroy(): void {
    this._cleanUp$.next();
    this._cleanUp$.complete();
  }

  private _processTodos(): void {
    this.isLoading = true;
    this._route.data
      .pipe(takeUntil(this._cleanUp$))
      .subscribe(({ fetchedTodos }) => {
        if (fetchedTodos.errorMsg) {
          this.errorMsg = fetchedTodos.errorMsg;
        } else {
          this._todos = fetchedTodos.data;
          this.filteredTodos = fetchedTodos.data;
          this._applyPagination();
        }
        this.isLoading = false;
        this._changeDetectorRef.detectChanges();
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
      todo.title.includes(
        this._searchComponent.filterValue.value?.toLowerCase() || ''
      )
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
      .subscribe(() => {
        this._todos = this._todos.filter((todo) => todo.id !== id);
        this.filterTodos();
        this._changeDetectorRef.detectChanges();
      });
  }

  public handlePageEvent(e: PageEvent): void {
    this.page = e.pageIndex;
    this.filterTodos();
  }
}
