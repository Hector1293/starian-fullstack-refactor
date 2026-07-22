import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { CreateTaskPayload, Task, UpdateTaskPayload } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl: string = `${environment.apiBaseUrl}/tarefas`;
  private readonly tasksUrl: string = `${environment.apiBaseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(title: string): Observable<Task> {
    const payload: CreateTaskPayload = { title };

    return this.http.post<Task>(this.apiUrl, payload);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateTaskCompleted(id: number, completed: boolean): Observable<Task> {
    const payload: UpdateTaskPayload = { completed };

    return this.http.patch<Task>(`${this.tasksUrl}/${id}`, payload);
  }
}
