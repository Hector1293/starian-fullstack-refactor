import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NewTask } from './task';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnChanges {
  @Input() resetKey: number = 0;
  @Output() createTask = new EventEmitter<string>();

  newTodo: NewTask = { title: '', completed: false };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetKey'] && !changes['resetKey'].firstChange) {
      this.newTodo = { title: '', completed: false };
    }
  }

  submit(): void {
    if (!this.newTodo.title.trim()) return;

    this.createTask.emit(this.newTodo.title);
  }
}
