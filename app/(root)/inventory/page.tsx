import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getAllInventory } from '@/actions/inventory';
import { getAllFilms } from '@/actions/film';
import { getAllStores } from '@/actions/store';
import { getAllAddresses } from '@/actions/address';
import { getAllCities } from '@/actions/city';

async function InventoryPage() {
  const inventory = await getAllInventory();
  const films = await getAllFilms();
  const stores = await getAllStores();
  const addresses = await getAllAddresses();
  const cities = await getAllCities();

  return (
    <div>
      <h1>Inventory</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Film</TableHead>
            <TableHead>Store</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => {
            const store = addresses.find(
              (addy) =>
                addy.address_id ===
                stores.find((store) => store.store_id === item.store_id)
                  ?.address_id
            );
            return (
              <TableRow key={item.inventory_id}>
                <TableCell className="w-[30px]">{item.inventory_id}</TableCell>
                <TableCell>
                  {films.find((film) => film.film_id === item.film_id)?.title}
                </TableCell>
                <TableCell>
                  {store?.address},{' '}
                  {cities.find((city) => city.city_id === store?.city_id)?.city}{' '}
                  {store?.district}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default InventoryPage;
