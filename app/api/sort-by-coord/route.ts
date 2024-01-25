import { sql } from '@vercel/postgres';

import { sortByCoord } from '@/lib/sorters';

import type { Client } from '@/lib/app.types';

async function GET() {
  try {
    const result = await sql`SELECT
        *
      FROM
        clients
      WHERE
        X <> 0
        AND Y <> 0
        AND X IS NOT NULL
        AND Y IS NOT NULL;`;

    const clients = result.rows as Client[];
    const sorted = sortByCoord(clients);

    return Response.json({ data: sorted });
  } catch (error) {
    return Response.error();
  }
}

export { GET };
