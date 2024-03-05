'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/constants';

export type State = {
  errors?: {
    film_id?: string[];
    store_id?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  inventory_id: z.string(),
  film_id: z.string(),
  store_id: z.string(),
});

const CreateInventory = FormSchema.omit({ inventory_id: true });

export async function createInventory(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInventory.safeParse({
    film_id: formData.get('film_id'),
    store_id: formData.get('store_id'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Inventory.',
    };
  }

  // Prepare data for insertion into the database
  const { film_id, store_id } = validatedFields.data;

  try {
    await prisma.inventory.create({
      data: {
        film_id: Number(film_id),
        store_id: Number(store_id),
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Inventory',
    };
  }

  revalidatePath('/inventory');
  redirect('/inventory');
}

const UpdateInventory = FormSchema.omit({ inventory_id: true });

export async function updateInventory(
  inventory_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateInventory.safeParse({
    film_id: formData.get('film_id'),
    store_id: formData.get('store_id'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Inventory.',
    };
  }

  const { film_id, store_id } = validateFields.data;

  try {
    await prisma.inventory.update({
      where: {
        inventory_id,
      },
      data: {
        film_id: Number(film_id),
        store_id: Number(store_id),
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Inventory.' };
  }

  revalidatePath('/inventory');
  redirect('/inventory');
}

export async function getInventoryById(id: number) {
  return await prisma.inventory.findUnique({
    where: {
      inventory_id: id,
    },
  });
}

export async function getFilteredInventory(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.inventory.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,

      include: {
        film: {
          select: {
            title: true,
          },
        },
      },
      where: {
        film: {
          title: { contains: query, mode: 'insensitive' },
        },
      },
    });
  }
  return await prisma.inventory.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    include: {
      film: {
        select: {
          title: true,
        },
      },
    },
  });
}

export async function fetchInventoryPages(query: string) {
  const count = await prisma.inventory.count({
    where: {
      film: {
        title: { contains: query, mode: 'insensitive' },
      },
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function deleteInventory(inventory_id: string) {
  try {
    await prisma.inventory.delete({
      where: {
        inventory_id: Number(inventory_id),
      },
    });
    revalidatePath('/inventory');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Inventory.' };
  }
}
