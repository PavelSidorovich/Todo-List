import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {
  filterValue: string = '';
  filterSubscription: Subscription;
  @Output() filterChanged = new EventEmitter<string>();
  @ViewChild('searchBar') searchBar: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    this.filterSubscription = fromEvent(this.searchBar.nativeElement, 'keyup')
      .pipe(
        map((v: any) => v.currentTarget.value),
        debounceTime(500)
      )
      .subscribe((filterValue) => {
        this.filterChanged.emit(filterValue);
      });
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }

  clearSearch(): void {
    this.filterValue = '';
    this.filterChanged.emit(this.filterValue);
  }
}
