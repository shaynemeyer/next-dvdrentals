'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

export async function getAllCustomers() {
  // using a raw query so we can use the view named 'customer_list'
  return await prisma.customer.findMany();
}

export async function getFilteredCustomers(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.customer.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            first_name: { contains: query, mode: 'insensitive' },
          },
          {
            last_name: { contains: query, mode: 'insensitive' },
          },
          {
            email: { contains: query, mode: 'insensitive' },
          },
        ],
      },
      include: {
        address: {
          select: {
            address: true,
          },
        },
      },
    });
  }
  return await prisma.customer.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
    include: {
      address: {
        select: {
          address: true,
        },
      },
    },
  });
}

export async function fetchCustomerPages(query: string) {
  const count = await prisma.customer.count({
    where: {
      OR: [
        {
          first_name: { contains: query, mode: 'insensitive' },
        },
        {
          last_name: { contains: query, mode: 'insensitive' },
        },
        {
          email: { contains: query, mode: 'insensitive' },
        },
      ],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}
