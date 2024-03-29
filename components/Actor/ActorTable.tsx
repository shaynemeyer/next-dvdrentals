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
import { DeleteActor, UpdateActor } from './Buttons';

async function ActorTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const actors = await getFilteredActors(query, currentPage);

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
        {actors.map((actor) => (
          <TableRow key={actor.actor_id}>
            <TableCell className="w-[30px]">{actor.actor_id}</TableCell>
            <TableCell>
              {actor.first_name} {actor.last_name}
            </TableCell>
            <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="flex justify-end gap-3">
                <UpdateActor actor_id={`${actor.actor_id}`} />
                <DeleteActor actor_id={`${actor.actor_id}`} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ActorTable;
