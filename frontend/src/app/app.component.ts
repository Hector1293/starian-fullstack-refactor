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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.todos = data;
      },
      (erro: unknown) => {
        console.error('Erro ao carregar tarefas:', erro);
        this.todos = [
          { id: 1, title: 'Tarefa offline 1', completed: false },
          { id: 2, title: 'Tarefa offline 2', completed: true }
        ];
      }
    );
  }

  addTodo(): void {
    if (!this.newTodo.title.trim()) return;

    this.taskService.createTask(this.newTodo.title).subscribe(
      (response) => {
        this.todos.push(response);

        this.newTodo = { title: '', completed: false };
      },
      (erro: unknown) => {
        console.error('Erro ao adicionar tarefa:', erro);
        const fakeTodo: Task = {
          id: Math.floor(Math.random() * 1000),
          title: this.newTodo.title,
          completed: false
        };
        this.todos.push(fakeTodo);
        this.newTodo = { title: '', completed: false };
      }
    );
  }

  removeTodo(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      (erro: unknown) => {
        console.error('Erro ao remover tarefa:', erro);
        this.todos = this.todos.filter(todo => todo.id !== id);
      }
    );
  }
}
