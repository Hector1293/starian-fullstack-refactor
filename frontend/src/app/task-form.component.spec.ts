import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renderiza corretamente', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const button = fixture.debugElement.query(By.css('button'));

    expect(input).toBeTruthy();
    expect(input.nativeElement.placeholder).toBe('Digite uma nova tarefa');
    expect(button.nativeElement.textContent.trim()).toBe('Adicionar');
  });

  it('emite evento ao criar uma tarefa', () => {
    spyOn(component.createTask, 'emit');
    component.newTodo.title = 'Nova tarefa';

    component.submit();

    expect(component.createTask.emit).toHaveBeenCalledOnceWith('Nova tarefa');
  });

  it('nao emite evento quando o titulo estiver vazio', () => {
    spyOn(component.createTask, 'emit');
    component.newTodo.title = '   ';

    component.submit();

    expect(component.createTask.emit).not.toHaveBeenCalled();
  });
});
