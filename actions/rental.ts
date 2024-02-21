'use server';

import prisma from '@/lib/db';

export async function getAllRentals() {
  // todo: page results because this query is huge.
  return await prisma.rental.findMany({ take: 10 });
}
