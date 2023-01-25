import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalWindowComponent } from '../components/modal-window/modal-window.component';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  private _componentRef: ComponentRef<ModalWindowComponent>;
  private _observable$: Subject<string>;

  constructor() {}

  public openModal(
    entry: ViewContainerRef,
    title: string,
    body: string
  ): Observable<string> {
    this._componentRef = entry.createComponent(ModalWindowComponent);
    this._componentRef.instance.title = title;
    this._componentRef.instance.body = body;
    this._componentRef.instance.closeEvent.subscribe(() => this.closeModal());
    this._componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    this._observable$ = new Subject<string>();

    return this._observable$.asObservable();
  }

  public closeModal(): void {
    this._observable$.complete();
    this._componentRef.destroy();
  }

  public confirm(): void {
    this._observable$.next('confirm');
    this.closeModal();
  }
}
