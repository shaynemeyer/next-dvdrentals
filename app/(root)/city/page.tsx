import React from 'react';
import { fetchCityPages } from '@/lib/actions/city';
import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/search';
import CityTable from '@/components/City/CityTable';
import { CreateCity } from '@/components/City/Buttons';

async function CityPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams?.query || '';
  const selectedPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCityPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Cites</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search cities..." />
        <CreateCity />
      </div>
      <CityTable query={searchParams.query} currentPage={selectedPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default CityPage;
