import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getFilteredCategories } from '@/lib/actions/category';
import { DeleteCategory, UpdateCategory } from './Buttons';

async function CategoryTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const categories = await getFilteredCategories(query, currentPage);

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
        {categories.map((category) => (
          <TableRow key={category.category_id}>
            <TableCell className="w-[30px]">{category.category_id}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="flex justify-end gap-3">
                <UpdateCategory category_id={`${category.category_id}`} />
                <DeleteCategory category_id={`${category.category_id}`} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CategoryTable;
