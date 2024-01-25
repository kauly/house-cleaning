'use client';

import * as z from 'zod';
import { PlusIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, DialogPanel, Title } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';

import { clientSchema } from '@/schemas/client';
import { HookedInput } from './hooked-input';
import { HookedNumberInput } from './hooked-number-input';

type FormData = z.infer<typeof clientSchema>;
const defaultValues: FormData = {
  name: '',
  email: '',
  phone: '',
  x: 1,
  y: 1
};

function AddClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: zodResolver(clientSchema),
    defaultValues
  });

  const toggleDialog = () => setIsOpen((p) => !p);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      await fetch('/api/create-new-client', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      methods.reset();
      toast.success('Cliente criado com sucesso!');
      toggleDialog();
      router.refresh();
    } catch (error) {
      toast.error('Error ao criar um cliente');
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <Button onClick={toggleDialog} icon={PlusIcon}>
        Novo Cliente
      </Button>

      <Dialog open={isOpen} onClose={toggleDialog} static={true}>
        <DialogPanel className="max-w-sm">
          <Title className="mb-3"> Criar novo cliente</Title>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col max-w-sm pb-2">
              <div className="h-[88px]">
                <HookedInput
                  name="name"
                  placeholder="Ex: Joao da Silva"
                  label="Nome"
                />
              </div>
              <div className="h-[88px]">
                <HookedInput
                  name="email"
                  placeholder="Ex: joao@bol.com.br"
                  label="Email"
                />
              </div>
              <div className="h-[88px]">
                <HookedInput
                  name="phone"
                  placeholder="Ex: 48994569778"
                  label="Celular"
                />
              </div>
              <div className="h-[88px] flex gap-2">
                <HookedNumberInput name="x" placeholder="Ex: 1" label="X" />
                <HookedNumberInput name="y" placeholder="Ex: 2" label="Y" />
              </div>
            </div>
            <Button variant="primary" type="submit" loading={isLoading}>
              Salvar
            </Button>
          </form>
        </DialogPanel>
      </Dialog>
    </FormProvider>
  );
}

export { AddClient };
