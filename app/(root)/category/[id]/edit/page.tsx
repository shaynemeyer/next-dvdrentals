import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCategoryById } from '@/lib/actions/category';
import EditForm from '@/components/Category/EditForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Edit Category',
};
async function EditCategoryPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const category = await getCategoryById(id);
  if (!category) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/category' },
          {
            label: 'Edit Catgory',
            href: `/category/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm category={category} />
    </main>
  );
}

export default EditCategoryPage;
