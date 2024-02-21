'use server';

import prisma from '@/lib/db';
import { CustomerList } from '@/types/CustomerList';

export async function getAllCustomers() {
  // using a raw query so we can use the view named 'customer_list'
  return await prisma.customer.findMany();
}
