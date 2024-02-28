import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getFilteredCustomers } from '@/lib/actions/customer';

async function CustomerTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const customers = await getFilteredCustomers(query, currentPage);

  return (
    <Table className="bg-white mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Active</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.customer_id}>
            <TableCell className="w-[30px]">{customer.customer_id}</TableCell>
            <TableCell>
              {customer.first_name} {customer.last_name}
            </TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer?.address?.address}</TableCell>
            <TableCell>{customer.active}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CustomerTable;
