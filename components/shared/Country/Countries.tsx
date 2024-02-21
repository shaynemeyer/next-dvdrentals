import { getAllCountries } from '@/lib/actions/country';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';

async function Countries() {
  const allCountries = await getAllCountries();
  return (
    <div>
      <h1>Countries</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCountries.map((item) => (
            <TableRow key={item.country_id}>
              <TableCell className="w-[30px]">{item.country_id}</TableCell>
              <TableCell>{item.country}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Countries;
