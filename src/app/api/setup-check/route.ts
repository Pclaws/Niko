import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';

export async function GET() {
  try {
    // Check if we can connect to the database
    let canConnect = false;
    let hasSchema = false;
    let hasData = false;

    try {
      // Try to query the products table
      const result = await db.select().from(products).limit(1);
      canConnect = true;
      hasSchema = true;
      hasData = result.length > 0;
    } catch (error: any) {
      canConnect = true; // If we get here, connection works
      
      // Check if it's a table doesn't exist error
      if (error.message?.includes('relation "products" does not exist')) {
        hasSchema = false;
      } else {
        // Some other error - assume schema exists but no data
        hasSchema = true;
        hasData = false;
      }
    }

    return NextResponse.json({
      canConnect,
      hasSchema,
      hasData,
    });
  } catch (error) {
    console.error('Setup check error:', error);
    return NextResponse.json({
      canConnect: false,
      hasSchema: false,
      hasData: false,
    });
  }
}