'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

export async function getAllCities() {
  return await prisma.city.findMany();
}

export async function fetchCityPages(query: string) {
  const count = await prisma.city.count({
    where: {
      OR: [{ city: { contains: query, mode: 'insensitive' } }],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getCityById(id: number) {
  return await prisma.city.findUnique({
    where: {
      city_id: id,
    },
  });
}

export async function getFilteredCities(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.city.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        city: { contains: query, mode: 'insensitive' },
      },
      include: {
        country: {
          select: {
            country: true,
          },
        },
      },
    });
  }
  return await prisma.city.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    include: {
      country: {
        select: {
          country: true,
        },
      },
    },
  });
}
