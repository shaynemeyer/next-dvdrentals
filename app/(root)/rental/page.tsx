import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getAllRentals } from '@/actions/rental';
import { getAllCustomers } from '@/actions/customer';
import { getAllStaff } from '@/actions/staff';
import { getAllInventory } from '@/actions/inventory';
import { getAllFilms } from '@/actions/film';

async function RentalPage() {
  const rentals = await getAllRentals();
  const customers = await getAllCustomers();
  const staff = await getAllStaff();
  const inventory = await getAllInventory();
  const films = await getAllFilms();

  return (
    <div>
      <h1>Rentals</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Rental Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Staff</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => (
            <TableRow key={rental.rental_id}>
              <TableCell className="w-[30px]">{rental.rental_id}</TableCell>
              <TableCell>
                {
                  customers.find(
                    (customer) => customer.customer_id === rental.customer_id
                  )?.email
                }
              </TableCell>
              <TableCell>
                {
                  films.find(
                    (film) =>
                      film.film_id ===
                      inventory.find(
                        (item) => item.inventory_id === rental.inventory_id
                      )?.film_id
                  )?.title
                }
              </TableCell>
              <TableCell>{rental.rental_date.toDateString()}</TableCell>
              <TableCell>{rental.return_date?.toDateString()}</TableCell>
              <TableCell>
                {staff.find((item) => item.id === rental.staff_id)?.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RentalPage;
