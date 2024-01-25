import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

async function DELETE() {
  try {
    const result = await sql`DELETE from clients`;
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.error();
  }
}

export { DELETE };
