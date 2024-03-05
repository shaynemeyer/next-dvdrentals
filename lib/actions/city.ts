'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/constants';

export type State = {
  errors?: {
    city?: string[];
    country_id?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  city_id: z.string(),
  country_id: z.string(),
  city: z.string(),
});

const CreateCity = FormSchema.omit({ city_id: true });

export async function createCity(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateCity.safeParse({
    city: formData.get('city'),
    country_id: formData.get('country_id'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create City.',
    };
  }

  // Prepare data for insertion into the database
  const { city, country_id } = validatedFields.data;

  try {
    await prisma.city.create({
      data: {
        city,
        country_id: Number(country_id),
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create City',
    };
  }

  revalidatePath('/city');
  redirect('/city');
}

const UpdateCity = FormSchema.omit({ city_id: true });

export async function updateCity(
  city_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateCity.safeParse({
    city: formData.get('city'),
    country_id: formData.get('country_id'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update City.',
    };
  }

  const { city, country_id } = validateFields.data;

  try {
    await prisma.city.update({
      where: {
        city_id,
      },
      data: {
        city,
        country_id: Number(country_id),
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update City.' };
  }

  revalidatePath('/city');
  redirect('/city');
}

export async function getCitiesForSelect() {
  return await prisma.city.findMany({
    select: {
      city_id: true,
      city: true,
    },
    orderBy: {
      city: 'asc',
    },
  });
}

export async function fetchCityPages(query: string) {
  const count = await prisma.city.count({
    where: {
      OR: [{ city: { contains: query, mode: 'insensitive' } }],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getCityById(id: number) {
  return await prisma.city.findUnique({
    where: {
      city_id: id,
    },
  });
}

export async function getCityByIdForSelect(id: number) {
  return await prisma.city.findUnique({
    select: {
      city_id: true,
      city: true,
    },
    where: {
      city_id: id,
    },
  });
}

export async function getFilteredCities(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.city.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        city: { contains: query, mode: 'insensitive' },
      },
      include: {
        country: {
          select: {
            country: true,
          },
        },
      },
    });
  }
  return await prisma.city.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    include: {
      country: {
        select: {
          country: true,
        },
      },
    },
  });
}

export async function deleteCity(city_id: string) {
  try {
    await prisma.city.delete({
      where: {
        city_id: Number(city_id),
      },
    });
    revalidatePath('/city');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete City.' };
  }
}
