import React from 'react';
import { getAllActors } from '@/actions/actor';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

async function Actors() {
  const actors = await getAllActors();

  return (
    <div>
      <h1>Actors</h1>
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
    </div>
  );
}

export default Actors;
