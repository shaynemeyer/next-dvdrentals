'use server';

import { ITEMS_PER_PAGE } from '@/constants';
import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    first_name?: string[];
    last_name?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  actor_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

const CreateActor = FormSchema.omit({ actor_id: true });

export async function createActor(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateActor.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Actor.',
    };
  }

  // Prepare data for insertion into the database
  const { first_name, last_name } = validatedFields.data;

  try {
    await prisma.actor.create({
      data: {
        first_name,
        last_name,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Actor',
    };
  }

  revalidatePath('/actor');
  redirect('/actor');
}

const UpdateActor = FormSchema.omit({ actor_id: true });

export async function updateActor(
  actor_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateActor.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Actor.',
    };
  }

  const { first_name, last_name } = validateFields.data;

  try {
    await prisma.actor.update({
      where: {
        actor_id: actor_id,
      },
      data: {
        first_name,
        last_name,
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Actor.' };
  }

  revalidatePath('/actor');
  redirect('/actor');
}

export async function getFilteredActors(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.actor.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          { first_name: { contains: query, mode: 'insensitive' } },
          { last_name: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }
  return await prisma.actor.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
  });
}

export async function fetchActorPages(query: string) {
  const count = await prisma.actor.count({
    where: {
      OR: [
        { first_name: { contains: query } },
        { last_name: { contains: query } },
      ],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getActorById(id: number) {
  return await prisma.actor.findUnique({
    where: {
      actor_id: id,
    },
  });
}

export async function getTotalActorCount() {
  return await prisma.actor.count();
}

export async function deleteActor(actor_id: string) {
  try {
    await prisma.actor.delete({
      where: {
        actor_id: Number(actor_id),
      },
    });
    revalidatePath('/actor');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Actor.' };
  }
}
