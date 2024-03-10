import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchFilteredPayments } from '@/lib/actions/payment';
import { StoreDisplay } from '@/types/Store';

async function PaymentTable({
  query,
  currentPage,
  stores,
}: {
  query: string;
  currentPage: number;
  stores: StoreDisplay[];
}) {
  const payments = await fetchFilteredPayments(query, currentPage);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Payment Date</TableHead>
          <TableHead>Rental Date</TableHead>
          <TableHead>Return Date</TableHead>
          <TableHead>Store</TableHead>
          <TableHead>Staff</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.payment_id}>
            <TableCell className="w-[30px]">{payment.payment_id}</TableCell>
            <TableCell>
              {payment.customer.first_name} {payment.customer.last_name}
            </TableCell>
            <TableCell>{payment.rental.inventory?.film?.title}</TableCell>
            <TableCell>${payment.amount.toString()}</TableCell>
            <TableCell>{payment.payment_date.toDateString()}</TableCell>
            <TableCell>{payment.rental.rental_date?.toDateString()}</TableCell>
            <TableCell>{payment.rental.return_date?.toDateString()}</TableCell>
            <TableCell>
              {
                stores.find(
                  (store) =>
                    store.store_id === payment.rental?.inventory?.store_id
                )?.address.address
              }
            </TableCell>
            <TableCell>
              {/* Show Staff  */}
              {payment.staff.first_name} {payment.staff.last_name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PaymentTable;
