'use server';

import prisma from '@/lib/db';

export async function getAllRentals() {
  return await prisma.rental.findMany();
}
