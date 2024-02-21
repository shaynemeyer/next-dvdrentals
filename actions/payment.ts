'use server';

import prisma from '@/lib/db';

export async function getAllPayments() {
  return await prisma.payment.findMany();
}
