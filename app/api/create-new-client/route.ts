import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { Client } from '../../lib/app.types';

export async function POST(request: NextRequest) {
  try {
    const client: Client = await request.json();
    const result =
      await sql`INSERT INTO clients(name, email, phone) VALUES(${client.name}, ${client.email}, ${client.phone})`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
