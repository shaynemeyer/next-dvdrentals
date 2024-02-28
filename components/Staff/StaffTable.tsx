import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getFilteredStaff } from '@/lib/actions/staff';

async function StaffTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const staff = await getFilteredStaff(query, currentPage);

  return (
    <Table className="bg-white mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Store</TableHead>
          <TableHead>Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staff.map((member) => (
          <TableRow key={member.staff_id}>
            <TableCell className="w-[30px]">{member.staff_id}</TableCell>
            <TableCell>
              {member.first_name} {member.last_name}
            </TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{member.username}</TableCell>
            <TableCell>{member.store_id}</TableCell>
            <TableCell>{member.active}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default StaffTable;
