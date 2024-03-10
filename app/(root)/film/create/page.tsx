import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/Film/CreateForm';

export const metadata: Metadata = {
  title: 'Create Film',
};

function CreateFilmPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Films', href: '/film' },
          {
            label: 'Create Film',
            href: '/film/create',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}

export default CreateFilmPage;
