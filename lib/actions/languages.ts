'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

export async function getAllLanguages() {
  return await prisma.language.findMany();
}

export async function fetchLanguagePages(query: string) {
  const count = await prisma.language.count({
    where: { name: { contains: query, mode: 'insensitive' } },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getLanguageById(id: number) {
  return await prisma.language.findUnique({
    where: {
      language_id: id,
    },
  });
}

export async function getFilteredLanguages(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.language.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
    });
  }
  return await prisma.language.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
  });
}
