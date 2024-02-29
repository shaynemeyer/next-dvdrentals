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
import { DeleteCountry, UpdateCountry } from './Buttons';

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
        {countries.map((country) => (
          <TableRow key={country.country_id}>
            <TableCell className="w-[30px]">{country.country_id}</TableCell>
            <TableCell>{country.country}</TableCell>
            <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="flex justify-end gap-3">
                <UpdateCountry country_id={`${country.country_id}`} />
                <DeleteCountry country_id={`${country.country_id}`} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CountryTable;
