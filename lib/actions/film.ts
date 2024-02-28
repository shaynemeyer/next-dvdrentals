'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

export async function getAllFilms() {
  return await prisma.film.findMany();
}

export async function fetchFilmPages(query: string) {
  const count = await prisma.film.count({
    where: {
      OR: [{ title: { contains: query, mode: 'insensitive' } }],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getFilmById(id: number) {
  return await prisma.film.findUnique({
    where: {
      film_id: id,
    },
  });
}

export async function getFilteredFilms(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.film.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        title: { contains: query, mode: 'insensitive' },
      },
    });
  }
  return await prisma.film.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
  });
}
