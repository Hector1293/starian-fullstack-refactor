import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AppComponent } from './app.component';
import { Task } from './task';
import { TaskService } from './task.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let tasks: Task[];

  beforeEach(async () => {
    taskService = jasmine.createSpyObj<TaskService>('TaskService', [
      'getTasks',
      'createTask',
      'deleteTask',
      'updateTaskCompleted'
    ]);
    tasks = [
      { id: 1, title: 'Primeira tarefa', completed: false },
      { id: 2, title: 'Segunda tarefa', completed: true }
    ];
    taskService.getTasks.and.returnValue(of(tasks));

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: TaskService, useValue: taskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('carrega tarefas na inicializacao', () => {
    fixture.detectChanges();

    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.todos).toEqual(tasks);
    expect(component.errorMessage).toBe('');
  });

  it('cria uma tarefa apos sucesso da API', () => {
    const createdTask: Task = { id: 3, title: 'Nova tarefa', completed: false };
    taskService.createTask.and.returnValue(of(createdTask));
    fixture.detectChanges();

    component.addTodo('Nova tarefa');

    expect(taskService.createTask).toHaveBeenCalledOnceWith('Nova tarefa');
    expect(component.todos).toContain(createdTask);
    expect(component.taskFormResetKey).toBe(1);
    expect(component.errorMessage).toBe('');
  });

  it('remove uma tarefa apos sucesso da API', () => {
    taskService.deleteTask.and.returnValue(of(void 0));
    fixture.detectChanges();

    component.removeTodo(1);

    expect(taskService.deleteTask).toHaveBeenCalledOnceWith(1);
    expect(component.todos).toEqual([tasks[1]]);
    expect(component.errorMessage).toBe('');
  });

  it('atualiza o status da tarefa apos sucesso da API', () => {
    const updatedTask: Task = { ...tasks[0], completed: true };
    taskService.updateTaskCompleted.and.returnValue(of(updatedTask));
    fixture.detectChanges();

    component.toggleCompleted(tasks[0]);

    expect(taskService.updateTaskCompleted).toHaveBeenCalledOnceWith(1, true);
    expect(component.todos[0]).toEqual(updatedTask);
    expect(component.errorMessage).toBe('');
  });

  it('trata erros do TaskService', () => {
    const error = new HttpErrorResponse({ status: 500 });
    spyOn(console, 'error');

    taskService.getTasks.and.returnValue(throwError(() => error));
    fixture.detectChanges();
    expect(component.errorMessage).toBe('Nao foi possivel carregar as tarefas.');

    taskService.createTask.and.returnValue(throwError(() => error));
    component.addTodo('Falha');
    expect(component.errorMessage).toBe('Nao foi possivel adicionar a tarefa.');

    taskService.deleteTask.and.returnValue(throwError(() => error));
    component.removeTodo(1);
    expect(component.errorMessage).toBe('Nao foi possivel remover a tarefa.');

    taskService.updateTaskCompleted.and.returnValue(throwError(() => error));
    component.toggleCompleted(tasks[0]);
    expect(component.errorMessage).toBe('Nao foi possivel atualizar a tarefa.');
  });
});
