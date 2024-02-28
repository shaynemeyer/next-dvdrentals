import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getLanguageById } from '@/lib/actions/languages';
import EditForm from '@/components/Language/EditForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edit Language',
};
async function EditLanguagePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const language = await getLanguageById(id);
  if (!language) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Languages', href: '/language' },
          {
            label: 'Edit Language',
            href: `/language/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm language={language} />
    </main>
  );
}

export default EditLanguagePage;
