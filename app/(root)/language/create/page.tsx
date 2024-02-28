import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/Language/CreateForm';

export const metadata: Metadata = {
  title: 'Create Language',
};

function CreateLanguagePage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Languages', href: '/language' },
          {
            label: 'Create Language',
            href: '/language/create',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}

export default CreateLanguagePage;
