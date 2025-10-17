import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a client with service role key to bypass RLS for testing
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // You'll need to add this to your .env.local
);

export async function POST() {
  try {
    const { data: task, error } = await supabaseAdmin
      .from('tasks')
      .insert([
        {
          title: 'Test Task (Admin)',
          description: 'This task was created with admin privileges',
          task_type: 'todo',
          user_id: null,
        }
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        error: 'Failed to create task with admin',
        details: error.message
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      task: {
        ...task,
        id: task.id.toString(),
        status: task.task_type || 'todo'
      }
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
