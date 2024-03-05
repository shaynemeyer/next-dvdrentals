import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import EditForm from '@/components/Inventory/EditForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { getCountriesForSelect } from '@/lib/actions/country';
import { getInventoryById } from '@/lib/actions/inventory';
import { getFilmsForSelect } from '@/lib/actions/film';
import { getStoresForSelect } from '@/lib/actions/store';

export const metadata: Metadata = {
  title: 'Edit Inventory',
};
async function EditInventoryPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const inventory = await getInventoryById(id);
  if (!inventory) {
    notFound();
  }

  const films = await getFilmsForSelect();
  const stores = await getStoresForSelect();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Inventory', href: '/inventory' },
          {
            label: 'Edit Inventory',
            href: `/inventory/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm inventory={inventory} films={films} stores={stores} />
    </main>
  );
}

export default EditInventoryPage;
