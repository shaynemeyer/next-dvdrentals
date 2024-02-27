import React from 'react';
import AddressTable from '@/components/Address/AddressTable';
import Pagination from '@/components/shared/Pagination';
import { fetchAddressPages } from '@/lib/actions/address';
import Search from '@/components/shared/search';
import { ITEMS_PER_PAGE } from '@/constants';

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams?.query || '';
  const selectedPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchAddressPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Addresses</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search addresses..." />
        {/* <CreateCustomer /> */}
      </div>

      <AddressTable query={searchParams.query} currentPage={selectedPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default page;
