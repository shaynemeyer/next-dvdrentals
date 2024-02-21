'use server';

import prisma from '@/lib/db';

export async function getAllAddresses() {
  return await prisma.address.findMany();
}

export async function getAddressById(id: number) {
  return await prisma.address.findUnique({
    where: {
      address_id: id,
    },
  });
}
