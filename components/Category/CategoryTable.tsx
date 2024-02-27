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

async function CategoryTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const categories = await getFilteredCategories(query, currentPage);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat.category_id}>
            <TableCell className="w-[30px]">{cat.category_id}</TableCell>
            <TableCell>{cat.name}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CategoryTable;
