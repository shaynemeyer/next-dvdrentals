'use server';

import prisma from '@/lib/db';

export async function getAllLanguages() {
  return await prisma.language.findMany();
}
