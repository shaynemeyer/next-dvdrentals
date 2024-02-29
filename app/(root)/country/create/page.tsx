import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/Country/CreateForm';

export const metadata: Metadata = {
  title: 'Create Country',
};

function CreateCountryPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Countries', href: '/country' },
          {
            label: 'Create Country',
            href: '/country/create',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}

export default CreateCountryPage;
