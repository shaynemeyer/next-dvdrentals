import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/Inventory/CreateForm';

import { getFilmsForSelect } from '@/lib/actions/film';
import { getStoresForSelect } from '@/lib/actions/store';

export const metadata: Metadata = {
  title: 'Create Inventory',
};

async function CreateInventoryPage() {
  const films = await getFilmsForSelect();
  const stores = await getStoresForSelect();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/inventory' },
          {
            label: 'Create Inventory',
            href: '/inventory/create',
            active: true,
          },
        ]}
      />
      <CreateForm films={films} stores={stores} />
    </main>
  );
}

export default CreateInventoryPage;
