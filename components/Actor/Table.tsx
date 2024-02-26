import React from 'react';
import { getFilteredActors } from '@/lib/actions/actor';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

async function ActorTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const actors = await getFilteredActors(query, currentPage);
  console.log({ actors });
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
        {actors.map((actor) => (
          <TableRow key={actor.actor_id}>
            <TableCell className="w-[30px]">{actor.actor_id}</TableCell>
            <TableCell>
              {actor.first_name} {actor.last_name}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ActorTable;
