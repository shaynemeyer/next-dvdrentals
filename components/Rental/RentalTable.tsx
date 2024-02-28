import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchFilteredRentals } from '@/lib/actions/rental';

async function RentalTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const rentals = await fetchFilteredRentals(query, currentPage);

  return (
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
              {rental.customer.first_name} {rental.customer.last_name}
            </TableCell>
            <TableCell>{rental.inventory?.film?.title}</TableCell>
            <TableCell>{rental.rental_date.toDateString()}</TableCell>
            <TableCell>{rental.return_date?.toDateString()}</TableCell>
            <TableCell>
              {/* Show Staff  */}
              {rental.staff.first_name} {rental.staff.last_name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default RentalTable;
