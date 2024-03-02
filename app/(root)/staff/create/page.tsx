import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/Staff/CreateForm';
import { getAddressesForSelect } from '@/lib/actions/address';
import { getStoresForSelect } from '@/lib/actions/store';

export const metadata: Metadata = {
  title: 'Create Staff',
};

async function CreateStaffPage() {
  const addresses = await getAddressesForSelect();
  const stores = await getStoresForSelect();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Staffs', href: '/staff' },
          {
            label: 'Create Staff',
            href: '/staff/create',
            active: true,
          },
        ]}
      />
      <CreateForm addresses={addresses} stores={stores} />
    </main>
  );
}

export default CreateStaffPage;
