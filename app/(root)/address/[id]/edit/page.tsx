import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAddressById } from '@/lib/actions/address';
import EditForm from '@/components/Address/EditForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { getCitiesForSelect } from '@/lib/actions/city';

export const metadata: Metadata = {
  title: 'Edit Address',
};
async function EditAddressPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const address = await getAddressById(id);
  if (!address) {
    notFound();
  }

  const cities = await getCitiesForSelect();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Addresses', href: '/address' },
          {
            label: 'Edit Address',
            href: `/address/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm address={address} cities={cities} />
    </main>
  );
}

export default EditAddressPage;
