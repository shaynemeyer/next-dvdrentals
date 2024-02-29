'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/constants';

export type State = {
  errors?: {
    country?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  country_id: z.string(),
  country: z.string(),
});

const CreateCountry = FormSchema.omit({ country_id: true });

export async function createCountry(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateCountry.safeParse({
    country: formData.get('country'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Country.',
    };
  }

  // Prepare data for insertion into the database
  const { country } = validatedFields.data;

  try {
    await prisma.country.create({
      data: {
        country,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Country',
    };
  }

  revalidatePath('/country');
  redirect('/country');
}

const UpdateCountry = FormSchema.omit({ country_id: true });

export async function updateCountry(
  country_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateCountry.safeParse({
    country: formData.get('country'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Country.',
    };
  }

  const { country } = validateFields.data;

  try {
    await prisma.country.update({
      where: {
        country_id,
      },
      data: {
        country,
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Country.' };
  }

  revalidatePath('/country');
  redirect('/country');
}

export async function getAllCountries() {
  return await prisma.country.findMany();
}

export async function fetchCountryPages(query: string) {
  const count = await prisma.country.count({
    where: {
      OR: [{ country: { contains: query, mode: 'insensitive' } }],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getCountryById(id: number) {
  return await prisma.country.findUnique({
    where: {
      country_id: id,
    },
  });
}

export async function getFilteredCountries(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.country.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        country: { contains: query, mode: 'insensitive' },
      },
      orderBy: {
        country: 'asc',
      },
    });
  }
  return await prisma.country.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    orderBy: {
      country: 'asc',
    },
  });
}

export async function deleteCountry(country_id: string) {
  try {
    await prisma.country.delete({
      where: {
        country_id: Number(country_id),
      },
    });
    revalidatePath('/country');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Country.' };
  }
}
