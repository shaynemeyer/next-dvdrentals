import React from 'react';
import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/search';
import RentalTable from '@/components/Rental/RentalTable';
import { fetchRentalPages } from '@/lib/actions/rental';

async function RentalPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams?.query || '';
  const selectedPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchRentalPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Rentals</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search rentals..." />
      </div>
      <RentalTable query={searchParams.query} currentPage={selectedPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default RentalPage;
