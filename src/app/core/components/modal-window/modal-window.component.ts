import {
  Component,
  OnInit,
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
export class ModalWindowComponent implements OnInit {
  @Input() title: string = '';
  @Input() body: string = '';
  @Output() closeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose(): void {
    this.closeEvent.emit();
  }

  onConfirm(): void {
    this.confirmEvent.emit();
  }
}
