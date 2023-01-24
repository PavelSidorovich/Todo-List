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
  @Input() public title: string = '';
  @Input() public body: string = '';
  @Output() public closeEvent = new EventEmitter();
  @Output() public confirmEvent = new EventEmitter();

  onClose(): void {
    this.closeEvent.emit();
  }

  onConfirm(): void {
    this.confirmEvent.emit();
  }
}
