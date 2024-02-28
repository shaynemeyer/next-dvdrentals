'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/constants';

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  category_id: z.string(),
  name: z.string(),
});

export async function getAllCategories() {
  return await prisma.category.findMany();
}

const CreateCategory = FormSchema.omit({ category_id: true });

export async function createCategory(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateCategory.safeParse({
    name: formData.get('name'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;

  try {
    await prisma.category.create({
      data: {
        name,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Category',
    };
  }

  revalidatePath('/category');
  redirect('/category');
}

const UpdateCategory = FormSchema.omit({ category_id: true });

export async function updateCategory(
  category_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateCategory.safeParse({
    name: formData.get('name'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Category.',
    };
  }

  const { name } = validateFields.data;

  try {
    await prisma.category.update({
      where: {
        category_id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Category.' };
  }

  revalidatePath('/category');
  redirect('/category');
}

export async function getFilteredCategories(
  query: string,
  currentPage: number
) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.category.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
    });
  }
  return await prisma.category.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
  });
}

export async function fetchCategoryPages(query: string) {
  const count = await prisma.category.count({
    where: {
      OR: [{ name: { contains: query } }],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getCategoryById(id: number) {
  return await prisma.category.findUnique({
    where: {
      category_id: id,
    },
  });
}

export async function deleteCategory(category_id: string) {
  try {
    await prisma.category.delete({
      where: {
        category_id: Number(category_id),
      },
    });
    revalidatePath('/category');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Category.' };
  }
}
