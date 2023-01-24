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
  public filterValue: string = '';
  @Output() public filterChanged = new EventEmitter<string>();

  private filterSubscription: Subscription;
  @ViewChild('searchBar') private searchBar: ElementRef;

  public ngAfterViewInit(): void {
    this.filterSubscription = fromEvent(this.searchBar.nativeElement, 'keyup')
      .pipe(
        map((v: any) => v.currentTarget.value),
        debounceTime(500)
      )
      .subscribe((filterValue) => {
        this.filterChanged.emit(filterValue);
      });
  }

  public ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }

  public clearSearch(): void {
    this.filterValue = '';
    this.filterChanged.emit(this.filterValue);
  }
}
