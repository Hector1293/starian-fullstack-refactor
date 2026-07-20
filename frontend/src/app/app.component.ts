import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Task, NewTask } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Todo List';
  todos: Task[] = [];
  newTodo: NewTask = { title: '', completed: false };
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.todos = data;
        this.errorMessage = '';
      },
      (erro: unknown) => {
        console.error('Erro ao carregar tarefas:', erro);
        this.errorMessage = 'Nao foi possivel carregar as tarefas.';
      }
    );
  }

  addTodo(): void {
    if (!this.newTodo.title.trim()) return;

    this.taskService.createTask(this.newTodo.title).subscribe(
      (response) => {
        this.todos.push(response);
        this.errorMessage = '';

        this.newTodo = { title: '', completed: false };
      },
      (erro: unknown) => {
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
      (erro: unknown) => {
        console.error('Erro ao remover tarefa:', erro);
        this.errorMessage = 'Nao foi possivel remover a tarefa.';
      }
    );
  }
}
