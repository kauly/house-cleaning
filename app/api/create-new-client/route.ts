import { sql } from '@vercel/postgres';
import { revalidatePath, revalidateTag } from 'next/cache';

import { Client } from '@/lib/app.types';
import { clientSchema } from '@/schemas/client';

async function POST(request: Request) {
  try {
    const client: Client = await request.json();
    clientSchema.parse(client);
    const result =
      await sql`INSERT INTO clients(name, email, phone, x, y) VALUES(${client.name}, ${client.email}, ${client.phone}, ${client.x}, ${client.y})`;

    revalidatePath('/');
    revalidateTag('sort-by-coord');
    return Response.json({ result }, { status: 200 });
  } catch (error) {
    return Response.error();
  }
}

export { POST };
