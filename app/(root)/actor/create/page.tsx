import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/Actor/CreateForm';

export const metadata: Metadata = {
  title: 'Create Customer',
};

function CreateActorPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Actors', href: '/actor' },
          {
            label: 'Create Actor',
            href: '/actor/create',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}

export default CreateActorPage;
