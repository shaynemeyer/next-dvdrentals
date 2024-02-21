import { getAllStaff } from '@/actions/staff';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';

async function StaffPage() {
  const allStaff = await getAllStaff();
  return (
    <div>
      <h1>Staff</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allStaff.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="w-[30px]">{member.id}</TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.phone}</TableCell>
              <TableCell>{member.address}</TableCell>
              <TableCell>{member.city}</TableCell>
              <TableCell>{member.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StaffPage;
