'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

export async function getAllInventory() {
  return await prisma.inventory.findMany();
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
  const count = await prisma.inventory.count();

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}
