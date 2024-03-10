import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getFilteredFilms } from '@/lib/actions/film';

async function FilmTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const films = await getFilteredFilms(query, currentPage);

  return (
    <Table className="bg-white mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Release Year</TableHead>
          <TableHead>Runtime</TableHead>
          <TableHead>Rental Price</TableHead>
          <TableHead>Rental Period</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {films &&
          films.map((film) => (
            <TableRow key={film.film_id}>
              <TableCell className="w-[30px]">{film.film_id}</TableCell>
              <TableCell>{film.title}</TableCell>
              <TableCell>{film.description}</TableCell>
              <TableCell>{film.language.name}</TableCell>
              <TableCell>{film.rating}</TableCell>
              <TableCell>{film.release_year}</TableCell>
              <TableCell>{film.length} Minutes</TableCell>
              <TableCell>${film.rental_rate.toString()}</TableCell>
              <TableCell>{film.rental_duration} days</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default FilmTable;
