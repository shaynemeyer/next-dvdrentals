import { fetchStaffPages } from '@/lib/actions/staff';
import React from 'react';
import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/search';
import StaffTable from '@/components/Staff/StaffTable';
import { CreateStaff } from '@/components/Staff/Buttons';

async function StaffPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams?.query || '';
  const selectedPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchStaffPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Staff</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search staff..." />
        <CreateStaff />
      </div>
      <StaffTable query={searchParams.query} currentPage={selectedPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default StaffPage;
