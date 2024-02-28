import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getFilteredInventory } from '@/lib/actions/inventory';

async function InventoryTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const inventory = await getFilteredInventory(query, currentPage);

  return (
    <Table className="bg-white mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Film</TableHead>
          <TableHead>Store</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventory.map((item) => (
          <TableRow key={item.inventory_id}>
            <TableCell className="w-[30px]">{item.inventory_id}</TableCell>
            <TableCell>{item?.film?.title}</TableCell>
            <TableCell>
              {/* {store?.address},{' '}
                {cities.find((city) => city.city_id === store?.city_id)?.city}{' '}
                {store?.district} */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default InventoryTable;
