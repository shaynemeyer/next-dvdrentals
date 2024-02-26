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
  // const rentals = (await fetchFilteredRentals(query, currentPage)) || [];

  return (
    // <Table>
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead>ID</TableHead>
    //       <TableHead>Customer</TableHead>
    //       <TableHead>Title</TableHead>
    //       <TableHead>Rental Date</TableHead>
    //       <TableHead>Return Date</TableHead>
    //       <TableHead>Staff</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     {rentals.map((rental) => (
    //       <TableRow key={rental.rental_id}>
    //         <TableCell className="w-[30px]">{rental.rental_id}</TableCell>
    //         <TableCell>
    //           {
    //             customers.find(
    //               (customer) => customer.customer_id === rental.customer_id
    //             )?.email
    //           }
    //         </TableCell>
    //         <TableCell>
    //           {
    //             films.find(
    //               (film) =>
    //                 film.film_id ===
    //                 inventory.find(
    //                   (item) => item.inventory_id === rental.inventory_id
    //                 )?.film_id
    //             )?.title
    //           }
    //         </TableCell>
    //         <TableCell>{rental.rental_date.toDateString()}</TableCell>
    //         <TableCell>{rental.return_date?.toDateString()}</TableCell>
    //         <TableCell>
    //           {staff.find((item) => item.id === rental.staff_id)?.name}
    //         </TableCell>
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>
    <div>test</div>
  );
}

export default RentalTable;
