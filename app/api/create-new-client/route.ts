import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { Client } from '@/lib/app.types';
import { clientSchema } from '@/schemas/client';

async function POST(request: NextRequest) {
  try {
    const client: Client = await request.json();
    clientSchema.parse(client);
    const result =
      await sql`INSERT INTO clients(name, email, phone) VALUES(${client.name}, ${client.email}, ${client.phone})`;

    revalidatePath('/');
    return NextResponse.json({ result, revalidated: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export { POST };
