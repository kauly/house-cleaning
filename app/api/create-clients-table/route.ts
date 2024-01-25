import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

async function GET() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const result =
      await sql`CREATE TABLE clients (id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (), name varchar(255) NOT NULL, email varchar(255),  phone varchar(20), x integer, y integer)`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

export { GET };
