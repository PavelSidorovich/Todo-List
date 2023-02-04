import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, fromEvent, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, AfterViewInit, OnDestroy {
  public filterValue = new FormControl<string>('');
  @Output() public filterChanged = new EventEmitter<string>();

  private _filterSubscription: Subscription;
  private _filterValueChangesSubscription: Subscription;
  @ViewChild('searchBar') private _searchBar: ElementRef;

  public ngOnInit(): void {
    this._filterValueChangesSubscription =
      this.filterValue.valueChanges.subscribe((res) => console.log(res));
  }

  public ngAfterViewInit(): void {
    this._filterSubscription = fromEvent(this._searchBar.nativeElement, 'keyup')
      .pipe(
        map((v: any) => v.currentTarget.value),
        debounceTime(500)
      )
      .subscribe((filterValue) => {
        this.filterChanged.emit(filterValue);
      });
  }

  public ngOnDestroy(): void {
    this._filterSubscription.unsubscribe();
    this._filterValueChangesSubscription.unsubscribe();
  }

  private testValueChanges(): void {}

  public clearSearch(): void {
    this.filterValue.setValue('');
    this.filterChanged.emit('');
  }
}
