import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllCustomers } from '@/lib/actions/customer';
import { getAllStores } from '@/lib/actions/store';
import { getAllAddresses } from '@/lib/actions/address';

async function Customers() {
  const customers = await getAllCustomers();
  const stores = await getAllStores();
  const addresses = await getAllAddresses();

  return (
    <div>
      <h1>Customers</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Store</TableHead>

            <TableHead>Active</TableHead>
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
              <TableCell>
                {
                  addresses.find(
                    (addy) => addy.address_id === customer.address_id
                  )?.address
                }
              </TableCell>
              <TableCell>
                {
                  addresses.find(
                    (addy) =>
                      addy.address_id ===
                      stores.find(
                        (store) => store.store_id === customer.store_id
                      )?.address_id
                  )?.address
                }
              </TableCell>

              <TableCell>{customer.active}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* {customers &&
          customers.map((customer) => (
            <li key={customer.customer_id}>
           
            </li>
          ))} */}
    </div>
  );
}

export default Customers;
