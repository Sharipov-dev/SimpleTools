import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';
import { supabase } from './supabaseClient';

const API_BASE = '/api/tasks';

export class TaskService {

  static async getTasks(): Promise<Task[] | null> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error(error);
      return null;
    }
    return data as Task[];
  }

  // Create a new task
  static async createTask(taskData: CreateTaskData): Promise<Task> {
    const userId = await this.getUserId();

    const {data, error} = await supabase
    .from('tasks')
    .insert([{...taskData, user_id: userId}])
    .select()
    .single();
    if (error) {
      console.error("Error creating task:", error);
      throw error;
    }
    return data as Task;
  }

  // Update a task
  static async updateTask(id: string, taskData: UpdateTaskData): Promise<Task> {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          task_type: taskData.task_type,
          status: taskData.status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const data = await response.json();
      return data.task;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // Delete a task
  static async deleteTask(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
  private static async getUserId(): Promise<string> {
    const {data, error} = await supabase.auth.getUser();
    if (error) {
      console.error("Error getting user:", error);
      throw error;
    }
    return data.user?.id;
  }
}
