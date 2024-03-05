import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCustomerByIdForEdit } from '@/lib/actions/customer';
import EditForm from '@/components/Customer/EditForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { getStoresForSelect } from '@/lib/actions/store';
import { getAddressesForSelect } from '@/lib/actions/address';

export const metadata: Metadata = {
  title: 'Edit Customer',
};
async function EditCustomerPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const customer = await getCustomerByIdForEdit(id);
  const stores = await getStoresForSelect();
  const addresses = await getAddressesForSelect();

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/customer' },
          {
            label: 'Edit Customer',
            href: `/customer/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm customer={customer} stores={stores} addresses={addresses} />
    </main>
  );
}

export default EditCustomerPage;
