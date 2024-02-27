'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

export async function getAllAddresses() {
  return await prisma.address.findMany();
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
    where: {
      address_id: id,
    },
  });
}
