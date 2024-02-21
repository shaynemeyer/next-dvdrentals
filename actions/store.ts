'use server';

import prisma from '@/lib/db';

export async function getAllStores() {
  return await prisma.store.findMany();
}
