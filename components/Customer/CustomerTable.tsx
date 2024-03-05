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
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { DeleteCustomer, UpdateCustomer } from './Buttons';

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
            <TableCell>
              {customer.active ? (
                <HandThumbUpIcon className="w-6 h-6" />
              ) : (
                <HandThumbDownIcon className="w-6 h-6" />
              )}
            </TableCell>
            <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="flex justify-end gap-3">
                <UpdateCustomer customer_id={`${customer.customer_id}`} />
                <DeleteCustomer customer_id={`${customer.customer_id}`} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CustomerTable;
