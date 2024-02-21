'use server';

import prisma from '@/lib/db';
import { FilmList } from '@/types/FilmList';

export async function getAllFilms() {
  return await prisma.film.findMany();
}
