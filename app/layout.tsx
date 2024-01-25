import './globals.css';

import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

import { Nav } from './components/nav';

export const metadata = {
  title: 'House Cleaning',
  description: 'Aplicação para o gerenciamento de clientes'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
