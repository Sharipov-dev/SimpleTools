import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// PUT /api/tasks/[id] - Update a task
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;
    const body = await request.json();
    const { title, description, task_type, status } = body;

    // Build update object with only provided fields
    const updateData: {
      title?: string;
      description?: string;
      task_type?: string;
    } = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (task_type !== undefined) updateData.task_type = task_type;
    if (status !== undefined) updateData.task_type = status; // Map status to task_type

    const { data: task, error } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      console.error('Error updating task:', error);
      return NextResponse.json(
        { error: 'Failed to update task' },
        { status: 500 }
      );
    }

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Transform the response
    const transformedTask = {
      ...task,
      id: task.id.toString(),
      status: task.task_type || 'todo' as const
    };

    return NextResponse.json({ task: transformedTask });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      console.error('Error deleting task:', error);
      return NextResponse.json(
        { error: 'Failed to delete task' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
