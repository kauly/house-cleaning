import { sql } from '@vercel/postgres';

async function DELETE() {
  try {
    const result = await sql`DELETE from clients`;
    return Response.json({ result });
  } catch (error) {
    return Response.error();
  }
}

export { DELETE };
