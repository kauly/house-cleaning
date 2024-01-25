import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

import type { Client } from '@/lib/app.types';

function ClientsTable({ clients = [] }: { clients: Client[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Phone</TableHeaderCell>
          <TableHeaderCell>X</TableHeaderCell>
          <TableHeaderCell>Y</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>
              <Text>{client.email}</Text>
            </TableCell>
            <TableCell>
              <Text>{client.phone}</Text>
            </TableCell>
            <TableCell>
              <Text>{client.x}</Text>
            </TableCell>
            <TableCell>
              <Text>{client.y}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { ClientsTable };
