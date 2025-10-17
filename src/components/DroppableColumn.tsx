'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/types/task';
import { TaskCard } from './TaskCard';
import { AddTaskDialog } from './AddTaskDialog';

interface DroppableColumnProps {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
  onDelete: (id: string) => void;
  onAdd: (title: string, description: string, status: TaskStatus) => void;
}

export function DroppableColumn({
  id,
  title,
  color,
  tasks,
  onDelete,
  onAdd,
}: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col bg-zinc-950/80 backdrop-blur-sm rounded-xl p-4 min-h-[600px] border transition-all ${
        isOver
          ? 'border-white bg-zinc-900/50 shadow-lg shadow-white/10'
          : 'border-zinc-800'
      }`}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white text-lg tracking-tight">
            {title}
          </h2>
          <span className="text-xs font-medium text-white bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700">
            {tasks.length}
          </span>
        </div>
        <div className={`h-0.5 rounded-full ${color}`} />
      </div>

      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 space-y-3 mb-4 min-h-[400px]">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
            />
          ))}
          {tasks.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[200px] border-2 border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-600 text-sm">Drop tasks here</p>
            </div>
          )}
        </div>
      </SortableContext>

      <AddTaskDialog
        onAdd={onAdd}
        status={id}
        columnTitle={title}
      />
    </div>
  );
}

