export const runtime = 'edge';

import { sql } from '@vercel/postgres';

type Params = {
  id: string;
};

async function DELETE(_: any, { params }: { params: Params }) {
  try {
    const id = params.id;
    const result = await sql`DELETE from clients WHERE id ${id} RETURNING id`;
    return Response.json({ result });
  } catch (error) {
    return Response.error();
  }
}

export { DELETE };
