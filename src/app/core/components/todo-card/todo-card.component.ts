import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Todo } from '../todos-layout/todo.interface';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input() public todo: Todo;
  @Output() public onDelete = new EventEmitter<number>();
  @Output() public onStatusChanged = new EventEmitter<number>();

  statusChanged(id: number): void {
    this.onStatusChanged.emit(id);
  }

  handleDelete() {
    this.onDelete.emit(this.todo.id);
  }
}
