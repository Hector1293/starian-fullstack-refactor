import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from './task';
import { TaskItemComponent } from './task-item.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() removeTask = new EventEmitter<number>();
  @Output() toggleTask = new EventEmitter<Task>();
}
