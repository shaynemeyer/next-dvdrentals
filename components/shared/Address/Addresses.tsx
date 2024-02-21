import React from 'react';
import { getAllAddresses } from '@/actions/address';
import { getAllCities } from '@/actions/city';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

async function Addresses() {
  const addresses = await getAllAddresses();
  const cities = await getAllCities();

  return (
    <div>
      <h1>Addresses</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Postal Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {addresses &&
            addresses.map((address) => (
              <TableRow key={address.address_id}>
                <TableCell className="w-[30px]">{address.address_id}</TableCell>
                <TableCell>{address.address}</TableCell>
                <TableCell>
                  {
                    cities.find((city) => city.city_id === address.city_id)
                      ?.city
                  }
                </TableCell>
                <TableCell>{address.district}</TableCell>
                <TableCell>{address.postal_code}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Addresses;
