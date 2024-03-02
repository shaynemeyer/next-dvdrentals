import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/Address/CreateForm';
import { getCitiesForSelect } from '@/lib/actions/city';

export const metadata: Metadata = {
  title: 'Create Address',
};

async function CreateAddressPage() {
  const cities = await getCitiesForSelect();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Addresses', href: '/address' },
          {
            label: 'Create Address',
            href: '/address/create',
            active: true,
          },
        ]}
      />
      <CreateForm cities={cities} />
    </main>
  );
}

export default CreateAddressPage;
