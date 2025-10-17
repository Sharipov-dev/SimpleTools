export interface Task {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  user_id: string;
  status: TaskStatus;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status: TaskStatus;
}

export interface UpdateTaskData {
  title?: string;
  task_type?: string;
  description?: string;
  status?: TaskStatus;
}

