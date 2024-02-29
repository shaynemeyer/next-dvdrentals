import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getStoreByIdForForm } from '@/lib/actions/store';
import EditForm from '@/components/Store/EditForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { getStaffForSelect } from '@/lib/actions/staff';
import { getAddressesForSelect } from '@/lib/actions/address';

export const metadata: Metadata = {
  title: 'Edit Store',
};
async function EditStorePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const store = await getStoreByIdForForm(id);
  if (!store) {
    notFound();
  }
  const allStaff = await getStaffForSelect();
  const allAddresses = await getAddressesForSelect();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Stores', href: '/store' },
          {
            label: 'Edit Store',
            href: `/store/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm store={store} addresses={allAddresses} staff={allStaff} />
    </main>
  );
}

export default EditStorePage;
