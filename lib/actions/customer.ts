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
    store_id?: string[];
    address_id?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  customer_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  store_id: z.string(),
  address_id: z.string(),
  active: z.number().optional(),
});

const CreateCustomer = FormSchema.omit({ customer_id: true });

export async function createCustomer(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateCustomer.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    store_id: formData.get('store_id'),
    address_id: formData.get('address_id'),
    active: formData.get('active') === null ? 0 : 1,
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }

  // Prepare data for insertion into the database
  const { first_name, last_name, email, store_id, address_id, active } =
    validatedFields.data;

  try {
    await prisma.customer.create({
      data: {
        first_name,
        last_name,
        email,
        store_id: Number(store_id),
        address_id: Number(address_id),
        active,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Customer',
    };
  }

  revalidatePath('/customer');
  redirect('/customer');
}

const UpdateCustomer = FormSchema.omit({ customer_id: true });

export async function updateCustomer(
  customer_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateCustomer.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    store_id: formData.get('store_id'),
    address_id: formData.get('address_id'),
    active: formData.get('active') === null ? 0 : 1,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Customer.',
    };
  }

  const { first_name, last_name, email, store_id, address_id, active } =
    validateFields.data;

  try {
    await prisma.customer.update({
      where: {
        customer_id,
      },
      data: {
        first_name,
        last_name,
        email,
        store_id: Number(store_id),
        address_id: Number(address_id),
        active: active,
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Customer.' };
  }

  revalidatePath('/customer');
  redirect('/customer');
}

export async function getFilteredCustomers(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.customer.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            first_name: { contains: query, mode: 'insensitive' },
          },
          {
            last_name: { contains: query, mode: 'insensitive' },
          },
          {
            email: { contains: query, mode: 'insensitive' },
          },
        ],
      },
      include: {
        address: {
          select: {
            address: true,
          },
        },
      },
    });
  }
  return await prisma.customer.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    include: {
      address: {
        select: {
          address: true,
        },
      },
    },
  });
}

export async function fetchCustomerPages(query: string) {
  const count = await prisma.customer.count({
    where: {
      OR: [
        {
          first_name: { contains: query, mode: 'insensitive' },
        },
        {
          last_name: { contains: query, mode: 'insensitive' },
        },
        {
          email: { contains: query, mode: 'insensitive' },
        },
      ],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function deleteCustomer(customer_id: string) {
  try {
    await prisma.customer.delete({
      where: {
        customer_id: Number(customer_id),
      },
    });
    revalidatePath('/customer');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Customer.' };
  }
}

export async function getCustomerByIdForEdit(id: number) {
  return await prisma.customer.findUnique({
    select: {
      customer_id: true,
      first_name: true,
      last_name: true,
      email: true,
      active: true,
      address_id: true,
      store_id: true,
      address: {
        select: {
          address: true,
        },
      },
    },
    where: {
      customer_id: id,
    },
  });
}
