import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCountryById } from '@/lib/actions/country';
import EditForm from '@/components/Country/EditForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edit Country',
};
async function EditCountryPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const country = await getCountryById(id);
  if (!country) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Countries', href: '/country' },
          {
            label: 'Edit Country',
            href: `/country/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm country={country} />
    </main>
  );
}

export default EditCountryPage;
