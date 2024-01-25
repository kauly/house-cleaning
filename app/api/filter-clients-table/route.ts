import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q');
    const result = await sql`SELECT * FROM clients WHERE name LIKE ${
      '%' + q + '%'
    } OR email LIKE ${'%' + q + '%'} OR phone LIKE ${'%' + q + '%'}`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

export { GET };
