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
import { DeleteStore, UpdateStore } from './Buttons';
import { getAddressesForSelect } from '@/lib/actions/address';

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
          <TableHead></TableHead>
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
            <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="flex justify-end gap-3">
                <UpdateStore store_id={`${store.store_id}`} />
                <DeleteStore store_id={`${store.store_id}`} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default StoreTable;
