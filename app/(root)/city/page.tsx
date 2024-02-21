import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllCities } from '@/actions/city';
import { getAllCountries } from '@/actions/country';

async function CityPage() {
  const cities = await getAllCities();
  const countries = await getAllCountries();

  return (
    <div>
      <h1>Cites</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cities.map((city) => (
            <TableRow key={city.city_id}>
              <TableCell className="w-[30px]">{city.city_id}</TableCell>
              <TableCell>{city.city}</TableCell>
              <TableCell>
                {
                  countries.find(
                    (country) => country.country_id === city.country_id
                  )?.country
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CityPage;
