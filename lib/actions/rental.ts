'use server';

import { ITEMS_PER_PAGE } from '@/constants';
import prisma from '@/lib/db';

export async function fetchFilteredRentals(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.rental.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            customer: {
              first_name: { contains: query, mode: 'insensitive' },
            },
          },
          {
            customer: {
              last_name: { contains: query, mode: 'insensitive' },
            },
          },
          {
            inventory: {
              film: {
                title: { contains: query, mode: 'insensitive' },
              },
            },
          },
        ],
      },
      include: {
        customer: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        inventory: {
          include: {
            film: {
              select: {
                title: true,
              },
            },
          },
        },
        staff: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }
  return await prisma.rental.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    include: {
      customer: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      inventory: {
        include: {
          film: {
            select: {
              title: true,
            },
          },
        },
      },
      staff: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });
}

export async function getRentalById(id: number) {
  return await prisma.rental.findUnique({
    where: {
      rental_id: id,
    },
  });
}

export async function fetchRentalPages(query: string) {
  const count = await prisma.rental.count({
    where: {
      OR: [
        {
          customer: {
            first_name: { contains: query, mode: 'insensitive' },
          },
        },
        {
          customer: {
            last_name: { contains: query, mode: 'insensitive' },
          },
        },
        {
          inventory: {
            film: {
              title: { contains: query, mode: 'insensitive' },
            },
          },
        },
      ],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}
