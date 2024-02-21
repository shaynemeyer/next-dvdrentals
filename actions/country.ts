'use server';

import prisma from '@/lib/db';

export async function getAllCountries() {
  return await prisma.country.findMany();
}
