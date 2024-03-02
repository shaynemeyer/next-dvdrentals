import React from 'react';
import { getFilteredAddresses } from '@/lib/actions/address';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeleteAddress, UpdateAddress } from './Buttons';

async function AddressTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const addresses = await getFilteredAddresses(query, currentPage);

  return (
    <Table className="bg-white mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead>District</TableHead>
          <TableHead>Postal Code</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {addresses &&
          addresses.map((address) => (
            <TableRow key={address.address_id}>
              <TableCell className="w-[30px]">{address.address_id}</TableCell>
              <TableCell>{address.address}</TableCell>
              <TableCell>{address.city.city}</TableCell>
              <TableCell>{address.district}</TableCell>
              <TableCell>{address.postal_code}</TableCell>
              <TableCell>{address.phone}</TableCell>
              <TableCell className="flex justify-end gap-3">
                <UpdateAddress address_id={`${address.address_id}`} />
                <DeleteAddress address_id={`${address.address_id}`} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default AddressTable;
