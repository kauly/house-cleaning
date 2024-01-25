import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

type Params = {
  id: string;
};

async function DELETE(_: any, { params }: { params: Params }) {
  try {
    const id = params.id;
    const result = await sql`DELETE from clients WHERE id ${id} RETURNING id`;
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export { DELETE };
