'use client';

import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { Task, TaskStatus, Column } from '@/types/task';
import { DroppableColumn } from './DroppableColumn';

const columns: Column[] = [
  { id: 'todo', title: 'To Do', color: 'bg-gradient-to-r from-zinc-400 to-zinc-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-gradient-to-r from-zinc-500 to-zinc-600' },
  { id: 'done', title: 'Done', color: 'bg-gradient-to-r from-zinc-600 to-zinc-700' },
];

interface KanbanBoardProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onAddTask: (title: string, description: string, status: TaskStatus) => void;
  onDeleteTask: (id: string) => void;
  onDragEnd: (taskId: string, newStatus: TaskStatus) => void;
  onRetry: () => void;
}

export function KanbanBoard({
  tasks,
  loading,
  error,
  onAddTask,
  onDeleteTask,
  onDragEnd,
  onRetry,
}: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const overId = over.id as string;

    // Check if we dropped over a column
    const targetColumn = columns.find((col) => col.id === overId);
    
    if (targetColumn) {
      onDragEnd(taskId, targetColumn.id);
    } else {
      // Check if we dropped over another task
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask && taskId !== overId) {
        onDragEnd(taskId, overTask.status);
      }
    }

    setActiveTask(null);
  };


  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white text-lg">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-red-400 text-lg mb-4">{error}</div>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          
          return (
            <DroppableColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              tasks={columnTasks}
              onDelete={onDeleteTask}
              onAdd={onAddTask}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="bg-zinc-900 border-2 border-white rounded-xl p-4 shadow-2xl shadow-white/20 rotate-2 scale-105">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-1">
                  {activeTask.title}
                </h3>
                {activeTask.description && (
                  <p className="text-sm text-zinc-300 line-clamp-2">
                    {activeTask.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

