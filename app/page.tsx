import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';

import { AddClient } from './components/add-client';
import { Search } from './components/search';
import { ClientsTable } from './components/table';

import type { Client } from './lib/app.types';
import { OrderBtn } from './components/order-btn';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const q = searchParams.q ?? '';
  const result = await sql`SELECT * FROM clients WHERE name LIKE ${
    '%' + q + '%'
  } OR email LIKE ${'%' + q + '%'} OR phone LIKE ${'%' + q + '%'}`;
  const clients = result.rows as Client[];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl flex flex-col gap-4">
      <div>
        <Title>Clientes</Title>
        <Text>Lista completa dos nossos clientes</Text>
      </div>
      <div className="flex flex-col sm:flex-row  gap-4 w-full">
        <Search />
        <AddClient />
        <OrderBtn />
      </div>
      <Card>
        <ClientsTable clients={clients} />
      </Card>
    </main>
  );
}
