import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getStaffByIdForEdit } from '@/lib/actions/staff';
import EditForm from '@/components/Staff/EditForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { getStoresForSelect } from '@/lib/actions/store';
import { getAddressesForSelect } from '@/lib/actions/address';

export const metadata: Metadata = {
  title: 'Edit Staff',
};
async function EditStaffPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const staff = await getStaffByIdForEdit(id);
  const stores = await getStoresForSelect();
  const addresses = await getAddressesForSelect();

  if (!staff) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Staffs', href: '/staff' },
          {
            label: 'Edit Staff',
            href: `/staff/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm staff={staff} stores={stores} addresses={addresses} />
    </main>
  );
}

export default EditStaffPage;
