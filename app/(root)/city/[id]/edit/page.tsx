import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCityById } from '@/lib/actions/city';
import EditForm from '@/components/City/EditForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { getCountriesForSelect } from '@/lib/actions/country';

export const metadata: Metadata = {
  title: 'Edit City',
};
async function EditCityPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const city = await getCityById(id);
  if (!city) {
    notFound();
  }
  const countries = await getCountriesForSelect();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cities', href: '/city' },
          {
            label: 'Edit City',
            href: `/city/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm city={city} countries={countries} />
    </main>
  );
}

export default EditCityPage;
