'use server';

import prisma from '@/lib/db';
import { StaffList } from '@/types/StaffList';

export async function getAllStaff() {
  return (await prisma.$queryRaw`select * from staff_list order by name`) as StaffList[];
}
