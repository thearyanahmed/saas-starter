import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';

export async function GET() {
  try {
    // Check database connection
    await db().execute('SELECT 1');
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured',
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed',
      },
      { status: 503 }
    );
  }
}