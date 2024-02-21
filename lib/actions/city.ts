'use server';

import prisma from '@/lib/db';

export async function getAllCities() {
  return await prisma.city.findMany();
}
