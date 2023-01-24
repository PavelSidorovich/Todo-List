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
  @Input() title: string = '';
  @Input() body: string = '';
  @Output() closeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  onClose(): void {
    this.closeEvent.emit();
  }

  onConfirm(): void {
    this.confirmEvent.emit();
  }
}
