'use server';

import { ITEMS_PER_PAGE } from '@/constants';
import prisma from '@/lib/db';

export async function getAllRentals({
  page = 1,
  take = ITEMS_PER_PAGE,
}: {
  page?: number;
  take?: number;
}) {
  // todo: page results because this query is huge.
  return await prisma.rental.findMany({ skip: (page - 1) * take, take });
}

export async function fetchFilteredRentals(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  return await prisma.rental.findMany({
    take: ITEMS_PER_PAGE,
    skip: offset,

    // include: {
    //   customer: {
    //     select: {
    //       email: true,
    //     },
    //   },
    //   inventory: {
    //     include: {
    //       film: {
    //         select: {
    //           title: true,
    //         },
    //       },
    //     },
    //   },
    //   staff: {
    //     select: {
    //       first_name: true,
    //       last_name: true,
    //       email: true,
    //     },
    //   },
    // },
  });
}

export async function getTotalRentalCount() {
  return await prisma.rental.count();
}
