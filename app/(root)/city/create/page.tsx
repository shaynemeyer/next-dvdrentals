import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/City/CreateForm';
import { getCountriesForSelect } from '@/lib/actions/country';

export const metadata: Metadata = {
  title: 'Create City',
};

async function CreateCityPage() {
  const countries = await getCountriesForSelect();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/city' },
          {
            label: 'Create City',
            href: '/city/create',
            active: true,
          },
        ]}
      />
      <CreateForm countries={countries} />
    </main>
  );
}

export default CreateCityPage;
