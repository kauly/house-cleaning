'use client';

import { Client } from '@/lib/app.types';
import { QueueListIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dialog,
  DialogPanel,
  List,
  ListItem,
  Title
} from '@tremor/react';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function OrderBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visitList, setVisitList] = useState<Client[]>([]);

  const toggleDialog = () => setIsOpen((p) => !p);

  const handleOpen = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/sort-by-coord', {
        next: { tags: ['sort-by-coord'] }
      });
      const body = (await response.json()) as { data: Client[] };
      setVisitList(body.data);
      setIsOpen(true);
    } catch (error) {
      toast.error('Error ao gerar lista de visitas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} icon={QueueListIcon} loading={isLoading}>
        Visualizar lista de visita
      </Button>
      <Dialog open={isOpen} onClose={toggleDialog} static={true}>
        <DialogPanel className="max-w-sm">
          <Title className="mb-3">Lista de visitas</Title>
          <List>
            {visitList.map((client) => (
              <ListItem key={client.id}>
                <span>{client.name}</span>
              </ListItem>
            ))}
          </List>
        </DialogPanel>
      </Dialog>
    </>
  );
}

export { OrderBtn };
