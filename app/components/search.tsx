'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { TextInput } from '@tremor/react';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Spinner } from './spinner';

function Search({ disabled }: { disabled?: boolean }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative  min-w-sm sm:min-w-lg">
      <label htmlFor="search" className="sr-only">
        Buscar
      </label>
      <TextInput
        type="text"
        name="search"
        id="search"
        disabled={disabled}
        placeholder="Buscar por tudo ..."
        spellCheck={false}
        onChange={(e) => handleSearch(e.target.value)}
        icon={MagnifyingGlassIcon}
      />

      {isPending && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export { Search };
