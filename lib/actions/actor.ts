'use server';

import prisma from '@/lib/db';
import { ActorInfo } from '@/types/ActorInfo';

export async function getAllActors() {
  return await prisma.actor.findMany();
}

export async function getActorById(id: number) {
  return await prisma.actor.findUnique({
    where: {
      actor_id: id,
    },
  });
}
