import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    // Test environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Environment check:');
    console.log('SUPABASE_URL exists:', !!supabaseUrl);
    console.log('SUPABASE_KEY exists:', !!supabaseKey);
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Missing environment variables',
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey
      }, { status: 500 });
    }

    // Test Supabase connection
    const { data, error } = await supabase
      .from('tasks')
      .select('count')
      .limit(1);

    if (error) {
      return NextResponse.json({
        error: 'Supabase connection failed',
        details: error.message,
        code: error.code
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      hasData: !!data
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
