'use server';

import { takeDefault } from '@/constants';
import prisma from '@/lib/db';

export async function getAllRentals({
  page = 0,
  take = takeDefault,
}: {
  page: number;
  take: number;
}) {
  // todo: page results because this query is huge.
  return await prisma.rental.findMany({ skip: page * take, take });
}

export async function getTotalRentalCount() {
  return await prisma.rental.count();
}
