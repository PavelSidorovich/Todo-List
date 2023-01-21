import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent implements OnInit {
  @Input() todo: Todo;
  @Output() onDelete = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  handleDelete() {
    this.onDelete.emit(this.todo.id);
  }
}
