import {
  Component,
  OnInit,
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
export class TodoCardComponent implements OnInit {
  @Input() todo: Todo;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onStatusChanged = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  statusChanged(id: number): void {
    this.onStatusChanged.emit(id);
  }

  handleDelete() {
    this.onDelete.emit(this.todo.id);
  }
}
