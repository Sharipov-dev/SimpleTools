'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Calendar } from 'lucide-react';
import { Task } from '@/types/task';
import { Button } from './ui/button';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-zinc-900 backdrop-blur-sm rounded-lg border border-zinc-800 p-4 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all ${
        isDragging ? 'opacity-50 rotate-2 scale-105' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing text-zinc-500 hover:text-white transition-colors"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white mb-1 line-clamp-2">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-zinc-400 mb-3 line-clamp-3">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {new Date(task.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

