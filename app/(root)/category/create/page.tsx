import React from 'react';

import { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import CreateForm from '@/components/Category/CreateForm';

export const metadata: Metadata = {
  title: 'Create Language',
};

function CreateCategoryPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/category' },
          {
            label: 'Create Category',
            href: '/category/create',
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}

export default CreateCategoryPage;
