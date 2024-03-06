'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

export async function getAllPayments() {
  return await prisma.payment.findMany();
}

export async function fetchFilteredPayments(
  query: string,
  currentPage: number
) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.payment.findMany({
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
            rental: {
              inventory: {
                film: {
                  title: { contains: query, mode: 'insensitive' },
                },
              },
            },
          },
          {
            staff: {
              first_name: { contains: query, mode: 'insensitive' },
            },
          },
          {
            staff: {
              last_name: { contains: query, mode: 'insensitive' },
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

        rental: {
          select: {
            rental_date: true,
            return_date: true,
            inventory: {
              select: {
                store_id: true,
                film: {
                  select: {
                    title: true,
                  },
                },
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
  return await prisma.payment.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    include: {
      customer: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      rental: {
        select: {
          rental_date: true,
          return_date: true,
          inventory: {
            select: {
              store_id: true,
              film: {
                select: {
                  title: true,
                },
              },
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

export async function getPaymentById(id: number) {
  return await prisma.payment.findUnique({
    where: {
      payment_id: id,
    },
  });
}

export async function fetchPaymentPages(query: string) {
  const count = await prisma.payment.count({
    where: {
      OR: [
        {
          customer: {
            first_name: { contains: query, mode: 'insensitive' },
          },
        },
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
          rental: {
            inventory: {
              film: {
                title: { contains: query, mode: 'insensitive' },
              },
            },
          },
        },
        {
          staff: {
            last_name: { contains: query, mode: 'insensitive' },
          },
        },
        {
          staff: {
            first_name: { contains: query, mode: 'insensitive' },
          },
        },
      ],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}
