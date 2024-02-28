import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getActorById } from '@/lib/actions/actor';
import EditForm from '@/components/Actor/EditForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edit Customer',
};
async function EditActorPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const actor = await getActorById(id);
  if (!actor) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Actors', href: '/actor' },
          {
            label: 'Edit Actor',
            href: `/actor/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm actor={actor} />
    </main>
  );
}

export default EditActorPage;
