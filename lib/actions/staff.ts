'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/constants';

export type State = {
  errors?: {
    first_name?: string[];
    last_name?: string[];
    email?: string[];
    active?: string[];
    username?: string[];
    store_id?: string[];
    address_id?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  staff_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  store_id: z.string(),
  address_id: z.string(),
  active: z.boolean().optional(),
  username: z.string(),
});

const CreateStaff = FormSchema.omit({ staff_id: true });

export async function createStaff(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateStaff.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    store_id: formData.get('store_id'),
    address_id: formData.get('address_id'),
    active: formData.get('active') === null ? false : true,
    username: formData.get('username'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Staff.',
    };
  }

  // Prepare data for insertion into the database
  const {
    first_name,
    last_name,
    email,
    store_id,
    address_id,
    active,
    username,
  } = validatedFields.data;

  try {
    await prisma.staff.create({
      data: {
        first_name,
        last_name,
        email,
        store_id: Number(store_id),
        address_id: Number(address_id),
        active: Boolean(active),
        username,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Staff',
    };
  }

  revalidatePath('/staff');
  redirect('/staff');
}

const UpdateStaff = FormSchema.omit({ staff_id: true });

export async function updateStaff(
  staff_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateStaff.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    store_id: formData.get('store_id'),
    address_id: formData.get('address_id'),
    active: formData.get('active') === null ? false : true,
    username: formData.get('username'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Staff.',
    };
  }

  const {
    first_name,
    last_name,
    email,
    store_id,
    address_id,
    active,
    username,
  } = validateFields.data;

  try {
    await prisma.staff.update({
      where: {
        staff_id,
      },
      data: {
        first_name,
        last_name,
        email,
        store_id: Number(store_id),
        address_id: Number(address_id),
        active: Boolean(active),
        username,
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Staff.' };
  }

  revalidatePath('/staff');
  redirect('/staff');
}

export async function getStaffForSelect() {
  return await prisma.staff.findMany({
    select: {
      staff_id: true,
      first_name: true,
      last_name: true,
    },
    orderBy: {
      last_name: 'asc',
    },
  });
}

export async function fetchStaffPages(query: string) {
  const count = await prisma.staff.count({
    where: {
      OR: [
        { first_name: { contains: query } },
        { last_name: { contains: query } },
        { email: { contains: query } },
        { username: { contains: query } },
      ],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getStaffById(id: number) {
  return await prisma.staff.findUnique({
    where: {
      staff_id: id,
    },
  });
}

export async function getStaffByIdForEdit(id: number) {
  return await prisma.staff.findUnique({
    select: {
      staff_id: true,
      first_name: true,
      last_name: true,
      email: true,
      active: true,
      address_id: true,
      store_id: true,
      username: true,
      address: {
        select: {
          address: true,
        },
      },
    },
    where: {
      staff_id: id,
    },
  });
}

export async function getFilteredStaff(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.staff.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          { first_name: { contains: query, mode: 'insensitive' } },
          { last_name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { username: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }
  return await prisma.staff.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
  });
}

export async function deleteStaff(staff_id: string) {
  try {
    await prisma.staff.delete({
      where: {
        staff_id: Number(staff_id),
      },
    });
    revalidatePath('/staff');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Staff.' };
  }
}
