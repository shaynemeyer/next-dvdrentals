'use server';

import { ITEMS_PER_PAGE } from '@/constants';
import prisma from '@/lib/db';
import { ActorInfo } from '@/types/ActorInfo';

export async function getAllActors() {
  return await prisma.actor.findMany();
}

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
