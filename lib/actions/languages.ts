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
  language_id: z.string(),
  name: z.string(),
});

const CreateLanguage = FormSchema.omit({ language_id: true });

export async function createLanguage(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateLanguage.safeParse({
    name: formData.get('name'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Language.',
    };
  }

  // Prepare data for insertion into the database
  const { name } = validatedFields.data;

  try {
    await prisma.language.create({
      data: {
        name,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Language',
    };
  }

  revalidatePath('/language');
  redirect('/language');
}

const UpdateLanguage = FormSchema.omit({ language_id: true });

export async function updateLanguage(
  language_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateLanguage.safeParse({
    name: formData.get('name'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Language.',
    };
  }

  const { name } = validateFields.data;

  try {
    await prisma.language.update({
      where: {
        language_id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Language.' };
  }

  revalidatePath('/language');
  redirect('/language');
}

export async function getLanguagesForSelect() {
  return await prisma.language.findMany({
    select: {
      language_id: true,
      name: true,
    },
  });
}

export async function fetchLanguagePages(query: string) {
  const count = await prisma.language.count({
    where: { name: { contains: query, mode: 'insensitive' } },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getLanguageById(id: number) {
  return await prisma.language.findUnique({
    where: {
      language_id: id,
    },
  });
}

export async function getFilteredLanguages(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.language.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
    });
  }
  return await prisma.language.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
  });
}

export async function deleteLanguage(language_id: string) {
  try {
    await prisma.language.delete({
      where: {
        language_id: Number(language_id),
      },
    });
    revalidatePath('/language');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Language.' };
  }
}
