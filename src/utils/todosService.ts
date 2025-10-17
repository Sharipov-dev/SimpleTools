import { supabase } from "@/lib/supabaseClient";
import { Task } from "@/types/task";

export const getTodos = async () => {
  const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
  return data as Task[];
};

export const createTodo = async (task: Omit<Task, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('tasks').insert([{
    title: task.title,
    description: task.description,
    status: task.status,
    user_id: task.user_id,
  }]).select();
  if (error) {
    console.error("Error creating task:", error);
    throw error;
  }
  return data;
};

export const updateTodo = async (id: string, updates: Partial<Task>) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({
      title: updates.title,
      description: updates.description,
      status: updates.status,
    })
    .eq('id', id)
    .select();
  if (error) {
    console.error("Error updating task:", error);
    throw error;
  }
  return data;
};

export const deleteTodo = async (id: string) => {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};