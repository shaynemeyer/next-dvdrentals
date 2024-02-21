'use server';

import prisma from '@/lib/db';

export async function getAllInventory() {
  return await prisma.inventory.findMany();
}
