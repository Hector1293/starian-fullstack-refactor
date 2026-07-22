import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from './task';

@Component({
  selector: 'li[app-task-item]',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() removeTask = new EventEmitter<number>();
  @Output() toggleTask = new EventEmitter<Task>();

  requestToggle(event: MouseEvent): void {
    event.preventDefault();
    this.toggleTask.emit(this.task);
  }
}
