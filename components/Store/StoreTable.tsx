import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getFilteredStores } from '@/lib/actions/store';

async function StoreTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const stores = await getFilteredStores(query, currentPage);

  return (
    <Table className="bg-white mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>District</TableHead>
          <TableHead>Manager</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stores.map((store) => (
          <TableRow key={store.store_id}>
            <TableCell className="w-[30px]">{store.store_id}</TableCell>
            <TableCell>{store.address.address}</TableCell>
            <TableCell>{store.address.district}</TableCell>
            <TableCell>
              {store.staff.first_name} {store.staff.last_name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default StoreTable;
