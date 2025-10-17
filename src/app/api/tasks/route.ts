import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// GET /api/tasks - Fetch all tasks
export async function GET() {
    const { data, error } = await supabase.from('tasks').select('*');
    console.log(data);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}
export async function POST(request: NextRequest) {
    const { data, error } = await supabase.from('tasks').insert(request.body);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}