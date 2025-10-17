'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { TaskStatus } from '@/types/task';

interface AddTaskDialogProps {
  onAdd: (title: string, description: string, status: TaskStatus) => void;
  status: TaskStatus;
  columnTitle: string;
}

export function AddTaskDialog({ onAdd, status, columnTitle }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, description, status);
      setTitle('');
      setDescription('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors w-full border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white h-9 px-4 py-2">
        <Plus className="w-4 h-4" />
        Add Task
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task in {columnTitle}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-white">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-white">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter task description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

