import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/Store/CreateForm';
import { getStaffForSelect } from '@/lib/actions/staff';
import { getAddressesForSelect } from '@/lib/actions/address';

export const metadata: Metadata = {
  title: 'Create Store',
};

async function CreateStorePage() {
  const allStaff = await getStaffForSelect();
  const addresses = await getAddressesForSelect();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Stores', href: '/store' },
          {
            label: 'Create Store',
            href: '/store/create',
            active: true,
          },
        ]}
      />
      <CreateForm staff={allStaff} addresses={addresses} />
    </main>
  );
}

export default CreateStorePage;
