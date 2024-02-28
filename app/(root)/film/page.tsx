import FilmTable from '@/components/Film/FilmTable';
import React from 'react';
import { fetchFilmPages } from '@/lib/actions/film';
import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/search';

async function FilmPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams?.query || '';
  const selectedPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchFilmPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Films</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search films..." />
      </div>
      <FilmTable query={searchParams.query} currentPage={selectedPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default FilmPage;
