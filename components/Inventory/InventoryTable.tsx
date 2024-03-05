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
import { DeleteInventory, UpdateInventory } from './Buttons';

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
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventory.map((item) => (
          <TableRow key={item.inventory_id}>
            <TableCell className="w-[30px]">{item.inventory_id}</TableCell>
            <TableCell>{item?.film?.title}</TableCell>
            <TableCell>{item.store_id}</TableCell>
            <TableCell className="flex justify-end gap-3">
              <UpdateInventory inventory_id={`${item.inventory_id}`} />
              <DeleteInventory inventory_id={`${item.inventory_id}`} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default InventoryTable;
