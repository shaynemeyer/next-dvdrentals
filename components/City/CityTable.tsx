import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getFilteredCities } from '@/lib/actions/city';

async function CityTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const cities = await getFilteredCities(query, currentPage);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cities.map((city) => (
          <TableRow key={city.city_id}>
            <TableCell className="w-[30px]">{city.city_id}</TableCell>
            <TableCell>{city.city}</TableCell>
            <TableCell>{city?.country?.country}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CityTable;
