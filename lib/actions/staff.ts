'use server';

import prisma from '@/lib/db';
import { ITEMS_PER_PAGE } from '@/constants';

export async function getStaffForSelect() {
  return await prisma.staff.findMany({
    select: {
      staff_id: true,
      first_name: true,
      last_name: true,
    },
    orderBy: {
      last_name: 'asc',
    },
  });
}

export async function fetchStaffPages(query: string) {
  const count = await prisma.staff.count({
    where: {
      OR: [
        { first_name: { contains: query } },
        { last_name: { contains: query } },
        { email: { contains: query } },
        { username: { contains: query } },
      ],
    },
  });

  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function getStaffById(id: number) {
  return await prisma.staff.findUnique({
    where: {
      staff_id: id,
    },
  });
}

export async function getFilteredStaff(query: string, currentPage: number) {
  const offsetSkip = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query) {
    return await prisma.staff.findMany({
      skip: offsetSkip,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          { first_name: { contains: query } },
          { last_name: { contains: query } },
          { email: { contains: query } },
          { username: { contains: query } },
        ],
      },
    });
  }
  return await prisma.staff.findMany({
    skip: offsetSkip,
    take: ITEMS_PER_PAGE,
  });
}
