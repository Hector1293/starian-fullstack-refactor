import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Task } from './task';
import { TaskItemComponent } from './task-item.component';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let tasks: Task[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    tasks = [
      { id: 1, title: 'Primeira tarefa', completed: false },
      { id: 2, title: 'Segunda tarefa', completed: true }
    ];
  });

  it('renderiza corretamente a lista recebida', () => {
    component.tasks = tasks;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.directive(TaskItemComponent));

    expect(items.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Primeira tarefa');
    expect(fixture.nativeElement.textContent).toContain('Segunda tarefa');
  });

  it('renderiza mensagem quando a lista estiver vazia', () => {
    component.tasks = [];
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('.empty-message'));

    expect(emptyMessage).toBeTruthy();
    expect(emptyMessage.nativeElement.textContent.trim()).toBe('Nenhuma tarefa encontrada.');
  });

  it('repassa corretamente os eventos dos itens', () => {
    spyOn(component.removeTask, 'emit');
    spyOn(component.toggleTask, 'emit');
    component.tasks = tasks;
    fixture.detectChanges();

    const taskItems = fixture.debugElement.queryAll(By.directive(TaskItemComponent));
    const firstItem = taskItems[0].componentInstance as TaskItemComponent;

    firstItem.removeTask.emit(tasks[0].id);
    firstItem.toggleTask.emit(tasks[0]);

    expect(component.removeTask.emit).toHaveBeenCalledOnceWith(tasks[0].id);
    expect(component.toggleTask.emit).toHaveBeenCalledOnceWith(tasks[0]);
  });
});
