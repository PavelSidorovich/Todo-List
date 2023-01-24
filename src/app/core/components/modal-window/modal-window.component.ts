import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWindowComponent {
  @Input() public set title(title: string) {
    this._title = title;
  }
  public get title(): string {
    return this._title;
  }

  @Input() public set body(body: string) {
    this._body = body;
  }
  public get body(): string {
    return this._body;
  }

  @Output() public closeEvent = new EventEmitter();
  @Output() public confirmEvent = new EventEmitter();

  private _title = '';
  private _body = '';

  public onClose(): void {
    this.closeEvent.emit();
  }

  public onConfirm(): void {
    this.confirmEvent.emit();
  }
}
