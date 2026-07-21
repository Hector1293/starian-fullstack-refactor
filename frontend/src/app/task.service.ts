import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { CreateTaskPayload, Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl: string = `${environment.apiBaseUrl}/tarefas`;

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
}
