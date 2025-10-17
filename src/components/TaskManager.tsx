'use client';

import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '@/types/task';
import { supabase } from '@/lib/supabaseClient';
import { KanbanBoard } from '@/components/KanbanBoard';
import { TaskService } from '@/lib/taskService';

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from Supabase on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from('tasks').select('*');
      if (error) {
        setError('Failed to load tasks');
        console.error('Error loading tasks:', error);
        return;
      }
      console.log('Loaded tasks:', data);
      setTasks(data as Task[] || []);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title: string, description: string, status: TaskStatus) => {
    try {
      const newTask = await TaskService.createTask({ title, description, status });
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating task:', error);
        setError('Failed to update task');
        return;
      }

      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? { ...task, ...updates } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting task:', error);
        setError('Failed to delete task');
        return;
      }

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  };

  const handleDragEnd = async (taskId: string, newStatus: TaskStatus) => {
    // Optimistic update
    const prevTasks = tasks;
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Update in database
    try {
      await handleUpdateTask(taskId, { status: newStatus });
    } catch (error) {
      // Rollback on failure
      setTasks(prevTasks);
      setError('Failed to update task status');
    }
  };

  return (
    <KanbanBoard
      tasks={tasks}
      loading={loading}
      error={error}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onDragEnd={handleDragEnd}
      onRetry={loadTasks}
    />
  );
}
