import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../environments/environment';
import { Task } from './task';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpTesting: HttpTestingController;

  const apiUrl = `${environment.apiBaseUrl}/tarefas`;
  const tasksUrl = `${environment.apiBaseUrl}/tasks`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TaskService
      ]
    });

    service = TestBed.inject(TaskService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('realiza GET para listar tarefas', () => {
    const response: Task[] = [
      { id: 1, title: 'Tarefa', completed: false }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(response);
    });

    const request = httpTesting.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');
    request.flush(response);
  });

  it('realiza POST para criar tarefa com payload correto', () => {
    const response: Task = { id: 1, title: 'Nova tarefa', completed: false };

    service.createTask('Nova tarefa').subscribe(task => {
      expect(task).toEqual(response);
    });

    const request = httpTesting.expectOne(apiUrl);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ title: 'Nova tarefa' });
    request.flush(response);
  });

  it('realiza PATCH para atualizar completed com payload correto', () => {
    const response: Task = { id: 1, title: 'Tarefa', completed: true };

    service.updateTaskCompleted(1, true).subscribe(task => {
      expect(task).toEqual(response);
    });

    const request = httpTesting.expectOne(`${tasksUrl}/1`);
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({ completed: true });
    request.flush(response);
  });

  it('realiza DELETE para remover tarefa', () => {
    service.deleteTask(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpTesting.expectOne(`${apiUrl}/1`);
    expect(request.request.method).toBe('DELETE');
    expect(request.request.body).toBeNull();
    request.flush(null);
  });
});
