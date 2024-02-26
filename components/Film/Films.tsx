import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getAllFilms } from '@/lib/actions/film';

async function Films() {
  const films = await getAllFilms();
  return (
    <div>
      <h1>Films</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Release Year</TableHead>
            <TableHead>Runtime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {films &&
            films.map((film) => (
              <TableRow key={film.film_id}>
                <TableCell className="w-[30px]">{film.film_id}</TableCell>
                <TableCell>{film.title}</TableCell>
                <TableCell>{film.description}</TableCell>
                <TableCell>{film.rating}</TableCell>
                <TableCell>{film.release_year}</TableCell>
                <TableCell>{film.length} Minutes</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Films;
