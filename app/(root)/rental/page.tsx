import React from 'react';

import { getAllRentals, getTotalRentalCount } from '@/lib/actions/rental';
import { getAllCustomers } from '@/lib/actions/customer';
import { getAllStaff } from '@/lib/actions/staff';
import { getAllInventory } from '@/lib/actions/inventory';
import { getAllFilms } from '@/lib/actions/film';
import Pagination from '@/components/shared/Pagination';
import { ITEMS_PER_PAGE } from '@/constants';
import Search from '@/components/shared/search';
import RentalTable from '@/components/Rental/Table';

async function RentalPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const selectedPage = Number(searchParams?.page) || 1;

  const rentals = await getAllRentals({ page: selectedPage });
  const rentalCount = await getTotalRentalCount();
  const customers = await getAllCustomers();
  const staff = await getAllStaff();
  const inventory = await getAllInventory();
  const films = await getAllFilms();

  const totalPages = Math.ceil(Number(rentalCount) / ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Rentals</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search rentals..." />
        {/* <CreateCustomer /> */}
      </div>
      <RentalTable
        query={searchParams.query}
        currentPage={Number(searchParams.page)}
      />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default RentalPage;
