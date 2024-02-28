'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

export async function getAllCountries() {
  return await prisma.country.findMany();
}

export async function fetchCountryPages(query: string) {
  const count = await prisma.country.count({
    where: {
      OR: [{ country: { contains: query, mode: 'insensitive' } }],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getCountryById(id: number) {
  return await prisma.country.findUnique({
    where: {
      country_id: id,
    },
  });
}

export async function getFilteredCountries(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.country.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        country: { contains: query, mode: 'insensitive' },
      },
    });
  }
  return await prisma.country.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
  });
}
