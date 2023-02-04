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
  @Input()
  public set modalTitle(title: string) {
    this.title = title;
  }
  @Input()
  public set modalBody(body: string) {
    this.body = body;
  }

  @Output() public closeEvent = new EventEmitter();
  @Output() public confirmEvent = new EventEmitter();
  public title = '';
  public body = '';

  public onClose(): void {
    this.closeEvent.emit();
  }

  public onConfirm(): void {
    this.confirmEvent.emit();
  }
}
