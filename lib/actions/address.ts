'use server';

import prisma from '@/lib/db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/constants';

export type State = {
  errors?: {
    address?: string[];
    address2?: string[];
    district?: string[];
    city_id?: string[];
    postal_code?: string[];
    phone?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  address_id: z.string(),
  address: z.string(),
  address2: z.string().optional(),
  district: z.string(),
  city_id: z.string(),
  postal_code: z.string().optional(),
  phone: z.string().optional(),
});

const CreateAddress = FormSchema.omit({ address_id: true });

export async function createAddress(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateAddress.safeParse({
    address: formData.get('address'),
    address2: formData.get('address2'),
    district: formData.get('district'),
    city_id: formData.get('city_id'),
    postal_code: formData.get('postal_code') || '',
    phone: formData.get('phone') || '',
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Address.',
    };
  }

  // Prepare data for insertion into the database
  const { address, address2, district, city_id, postal_code, phone } =
    validatedFields.data;

  try {
    await prisma.address.create({
      data: {
        address,
        address2,
        district,
        city_id: Number(city_id),
        postal_code,
        phone: phone || '',
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Address',
    };
  }

  revalidatePath('/address');
  redirect('/address');
}

const UpdateAddress = FormSchema.omit({ address_id: true });

export async function updateAddress(
  address_id: number,
  prevState: State,
  formData: FormData
) {
  const validateFields = UpdateAddress.safeParse({
    address: formData.get('address'),
    address2: formData.get('address2'),
    district: formData.get('district'),
    city_id: formData.get('city_id'),
    postal_code: formData.get('postal_code') || '',
    phone: formData.get('phone') || '',
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Address.',
    };
  }

  const { address, address2, district, city_id, postal_code, phone } =
    validateFields.data;

  try {
    await prisma.address.update({
      where: {
        address_id: address_id,
      },
      data: {
        address,
        address2,
        district,
        city_id: Number(city_id),
        postal_code,
        phone: phone || '',
      },
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Address.' };
  }

  revalidatePath('/address');
  redirect('/address');
}

export async function getAddressesForSelect() {
  return await prisma.address.findMany({
    select: {
      address: true,
      address_id: true,
    },
    orderBy: {
      address: 'asc',
    },
  });
}

export async function getFilteredAddresses(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.address.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          { address: { contains: query } },
          { district: { contains: query } },
          { postal_code: { contains: query } },
        ],
      },
      include: {
        city: {
          select: {
            city: true,
          },
        },
      },
    });
  }
  return await prisma.address.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    include: {
      city: {
        select: {
          city: true,
        },
      },
    },
  });
}

export async function fetchAddressPages(query: string) {
  const count = await prisma.address.count({
    where: {
      OR: [
        { address: { contains: query, mode: 'insensitive' } },
        { district: { contains: query, mode: 'insensitive' } },
      ],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getAddressById(id: number) {
  return await prisma.address.findUnique({
    select: {
      address_id: true,
      address: true,
      address2: true,
      district: true,
      city_id: true,
      postal_code: true,
      phone: true,
    },
    where: {
      address_id: id,
    },
  });
}

export async function deleteAddress(address_id: string) {
  try {
    await prisma.address.delete({
      where: {
        address_id: Number(address_id),
      },
    });
    revalidatePath('/address');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Address.' };
  }
}
