import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalWindowComponent } from '../components/modal-window/modal-window.component';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  private componentRef: ComponentRef<ModalWindowComponent>;
  private observable$: Subject<string>;

  constructor() {}

  openModal(
    entry: ViewContainerRef,
    title: string,
    body: string
  ): Observable<string> {
    this.componentRef = entry.createComponent(ModalWindowComponent);
    this.componentRef.instance.title = title;
    this.componentRef.instance.body = body;
    this.componentRef.instance.closeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    this.observable$ = new Subject<string>();

    return this.observable$.asObservable();
  }

  closeModal(): void {
    this.observable$.complete();
    this.componentRef.destroy();
  }

  confirm(): void {
    this.observable$.next('confirm');
    this.closeModal();
  }
}
