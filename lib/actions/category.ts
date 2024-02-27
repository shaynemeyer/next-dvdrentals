'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

export async function getAllCategories() {
  return await prisma.category.findMany();
}

export async function getFilteredCategories(
  query: string,
  currentPage: number
) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.category.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
    });
  }
  return await prisma.category.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
  });
}

export async function fetchCategoryPages(query: string) {
  const count = await prisma.category.count({
    where: {
      OR: [{ name: { contains: query } }],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getCategoryById(id: number) {
  return await prisma.category.findUnique({
    where: {
      category_id: id,
    },
  });
}
