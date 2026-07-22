import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { Task } from './task';
import { TaskFormComponent } from './task-form.component';
import { TaskListComponent } from './task-list.component';
import { TaskService } from './task.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TaskFormComponent, TaskListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = 'Todo List';
  todos: Task[] = [];
  errorMessage: string = '';
  taskFormResetKey: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.todos = data;
        this.errorMessage = '';
      },
      (erro: HttpErrorResponse) => {
        console.error('Erro ao carregar tarefas:', erro);
        this.errorMessage = 'Nao foi possivel carregar as tarefas.';
      }
    );
  }

  addTodo(title: string): void {
    this.taskService.createTask(title).subscribe(
      (response: Task) => {
        this.todos.push(response);
        this.errorMessage = '';
        this.taskFormResetKey += 1;
      },
      (erro: HttpErrorResponse) => {
        console.error('Erro ao adicionar tarefa:', erro);
        this.errorMessage = 'Nao foi possivel adicionar a tarefa.';
      }
    );
  }

  removeTodo(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.errorMessage = '';
      },
      (erro: HttpErrorResponse) => {
        console.error('Erro ao remover tarefa:', erro);
        this.errorMessage = 'Nao foi possivel remover a tarefa.';
      }
    );
  }

  toggleCompleted(task: Task): void {
    this.taskService.updateTaskCompleted(task.id, !task.completed).subscribe(
      (updatedTask: Task) => {
        this.todos = this.todos.map(todo => todo.id === updatedTask.id ? updatedTask : todo);
        this.errorMessage = '';
      },
      (erro: HttpErrorResponse) => {
        console.error('Erro ao atualizar tarefa:', erro);
        this.errorMessage = 'Nao foi possivel atualizar a tarefa.';
      }
    );
  }
}
