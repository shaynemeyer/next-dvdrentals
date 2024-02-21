'use server';

import prisma from '@/lib/db';

export async function getAllCategories() {
  return await prisma.category.findMany();
}
