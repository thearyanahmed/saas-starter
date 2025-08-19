import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';

export async function GET() {
  try {
    // Check database connection if available
    const database = db();
    let dbStatus = 'not configured';
    
    if (database) {
      try {
        await database.execute('SELECT 1');
        dbStatus = 'connected';
      } catch (error) {
        dbStatus = 'error';
      }
    }
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
        stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured',
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Service check failed',
      },
      { status: 503 }
    );
  }
}