import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const result =
      await sql`CREATE TABLE clients (id UUID PRIMARY KEY DEFAULT uuid_generate_v4 () , name varchar(255), email varchar(255),  phone varchar(20))`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
