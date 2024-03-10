'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/constants';

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  film_id: z.string(),
  title: z.string(),
});

const CreateFilm = FormSchema.omit({ film_id: true });

export async function createFilm(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateFilm.safeParse({
    title: formData.get('title'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Film.',
    };
  }

  // Prepare data for insertion into the database
  const { title } = validatedFields.data;

  try {
    // fixed create issue.
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Film',
    };
  }

  revalidatePath('/film.');
  redirect('/film.');
}

const UpdateFilm = FormSchema.omit({ film_id: true });

export async function updateFilm(
  film_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateFilm.safeParse({
    title: formData.get('title'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Film.',
    };
  }

  const { title } = validateFields.data;

  try {
    await prisma.film.update({
      where: {
        film_id,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Film.' };
  }

  revalidatePath('/film.');
  redirect('/film.');
}

export async function getFilmsForSelect() {
  return await prisma.film.findMany({
    select: {
      film_id: true,
      title: true,
    },
    orderBy: {
      title: 'asc',
    },
  });
}

export async function fetchFilmPages(query: string) {
  const count = await prisma.film.count({
    where: {
      OR: [{ title: { contains: query, mode: 'insensitive' } }],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getFilmById(id: number) {
  return await prisma.film.findUnique({
    where: {
      film_id: id,
    },
  });
}

export async function getFilteredFilms(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.film.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        film_id: true,
        title: true,
        description: true,
        release_year: true,
        rental_rate: true,
        rental_duration: true,
        length: true,
        rating: true,
        language: {
          select: {
            language_id: true,
            name: true,
          },
        },
      },
    });
  }
  return await prisma.film.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    select: {
      film_id: true,
      title: true,
      description: true,
      release_year: true,
      rental_rate: true,
      rental_duration: true,
      length: true,
      rating: true,
      language: {
        select: {
          language_id: true,
          name: true,
        },
      },
    },
  });
}

export async function deleteFilm(film_id: string) {
  try {
    await prisma.film.delete({
      where: {
        film_id: Number(film_id),
      },
    });
    revalidatePath('/film');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Film.' };
  }
}
