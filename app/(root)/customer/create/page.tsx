import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/Customer/CreateForm';
import { getAddressesForSelect } from '@/lib/actions/address';
import { getStoresForSelect } from '@/lib/actions/store';

export const metadata: Metadata = {
  title: 'Create Customer',
};

async function CreateCustomerPage() {
  const addresses = await getAddressesForSelect();
  const stores = await getStoresForSelect();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/customer' },
          {
            label: 'Create Customer',
            href: '/customer/create',
            active: true,
          },
        ]}
      />
      <CreateForm addresses={addresses} stores={stores} />
    </main>
  );
}

export default CreateCustomerPage;
