'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/constants';

export type State = {
  errors?: {
    manager_staff_id?: string[];
    address_id?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  store_id: z.string(),
  manager_staff_id: z.number(),
  address_id: z.number(),
});

const CreateStore = FormSchema.omit({ store_id: true });

export async function createStore(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateStore.safeParse({
    manager_staff_id: formData.get('manager_staff_id'),
    address_id: formData.get('address_id'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Store.',
    };
  }

  // Prepare data for insertion into the database
  const { manager_staff_id, address_id } = validatedFields.data;

  try {
    await prisma.store.create({
      data: {
        manager_staff_id,
        address_id,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Store',
    };
  }

  revalidatePath('/store');
  redirect('/store');
}

const UpdateStore = FormSchema.omit({ store_id: true });

export async function updateStore(
  store_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateStore.safeParse({
    manager_staff_id: formData.get('manager_staff_id'),
    address_id: formData.get('address_id'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Store.',
    };
  }

  const { manager_staff_id, address_id } = validateFields.data;

  try {
    await prisma.store.update({
      where: {
        store_id,
      },
      data: {
        manager_staff_id,
        address_id,
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Store.' };
  }

  revalidatePath('/store');
  redirect('/store');
}

export async function fetchStorePages(query: string) {
  const count = await prisma.store.count({
    where: {
      OR: [
        {
          staff: {
            first_name: { contains: query, mode: 'insensitive' },
            last_name: { contains: query, mode: 'insensitive' },
          },
        },
        {
          address: {
            address: { contains: query, mode: 'insensitive' },
            district: { contains: query, mode: 'insensitive' },
          },
        },
      ],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getStoreById(id: number) {
  return await prisma.store.findUnique({
    where: {
      store_id: id,
    },
  });
}

export async function getStoreByIdForForm(id: number) {
  return await prisma.store.findUnique({
    select: {
      store_id: true,
      address_id: true,
      manager_staff_id: true,
    },
    where: {
      store_id: id,
    },
  });
}

export async function getFilteredStores(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.store.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            staff: {
              first_name: { contains: query, mode: 'insensitive' },
              last_name: { contains: query, mode: 'insensitive' },
            },
          },
          {
            address: {
              address: { contains: query, mode: 'insensitive' },
              district: { contains: query, mode: 'insensitive' },
            },
          },
        ],
      },
      include: {
        staff: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        address: {
          select: {
            address: true,
            district: true,
          },
        },
      },
    });
  }
  return await prisma.store.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    include: {
      staff: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      address: {
        select: {
          address: true,
          district: true,
        },
      },
    },
  });
}

export async function deleteStore(store_id: string) {
  try {
    await prisma.store.delete({
      where: {
        store_id: Number(store_id),
      },
    });
    revalidatePath('/store');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Store.' };
  }
}
