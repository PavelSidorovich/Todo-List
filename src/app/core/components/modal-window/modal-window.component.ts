import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-modal-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('0.3s'),
      ]),
    ]),
  ],
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
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
  public title: string = '';
  public body: string = '';

  public onClose(): void {
    this.closeEvent.emit();
  }

  public onConfirm(): void {
    this.confirmEvent.emit();
  }
}
