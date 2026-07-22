export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export type NewTask = Pick<Task, 'title' | 'completed'>;

export type CreateTaskPayload = Pick<Task, 'title'>;

export type UpdateTaskPayload = Pick<Task, 'completed'>;
