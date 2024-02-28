'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

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
