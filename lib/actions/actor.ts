'use server';

import { ITEMS_PER_PAGE } from '@/constants';
import prisma from '@/lib/db';

export async function getFilteredActors(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.actor.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          { first_name: { contains: query } },
          { last_name: { contains: query } },
        ],
      },
    });
  }
  return await prisma.actor.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
  });
}

export async function fetchActorPages(query: string) {
  const count = await prisma.actor.count({
    where: {
      OR: [
        { first_name: { contains: query } },
        { last_name: { contains: query } },
      ],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getActorById(id: number) {
  return await prisma.actor.findUnique({
    where: {
      actor_id: id,
    },
  });
}

export async function getTotalActorCount() {
  return await prisma.actor.count();
}
