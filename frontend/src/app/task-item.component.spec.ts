import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Task } from './task';
import { TaskItemComponent } from './task-item.component';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let task: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    task = {
      id: 1,
      title: 'Tarefa teste',
      completed: false
    };
    component.task = task;
    fixture.detectChanges();
  });

  it('exibe titulo da tarefa', () => {
    const title = fixture.debugElement.query(By.css('.todo-title'));

    expect(title.nativeElement.textContent.trim()).toBe('Tarefa teste');
  });

  it('exibe estado concluido corretamente', () => {
    component.task = { ...task, completed: true };
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    const title = fixture.debugElement.query(By.css('.todo-title'));

    expect(checkbox.nativeElement.checked).toBeTrue();
    expect(title.classes['todo-title--completed']).toBeTrue();
  });

  it('emite evento ao alterar o checkbox', () => {
    spyOn(component.toggleTask, 'emit');
    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));

    checkbox.triggerEventHandler('click', new MouseEvent('click'));

    expect(component.toggleTask.emit).toHaveBeenCalledOnceWith(task);
  });

  it('emite evento ao clicar em remover', () => {
    spyOn(component.removeTask, 'emit');
    const button = fixture.debugElement.query(By.css('.remove-button'));

    button.triggerEventHandler('click');

    expect(component.removeTask.emit).toHaveBeenCalledOnceWith(task.id);
  });
});
