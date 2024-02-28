import { getFilteredCountries } from '@/lib/actions/country';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';

async function CountryTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const countries = await getFilteredCountries(query, currentPage);

  return (
    <Table className="bg-white mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {countries.map((item) => (
          <TableRow key={item.country_id}>
            <TableCell className="w-[30px]">{item.country_id}</TableCell>
            <TableCell>{item.country}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CountryTable;
