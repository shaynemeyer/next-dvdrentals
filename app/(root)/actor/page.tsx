import ActorTable from '@/components/Actor/Table';
import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/search';
import { ITEMS_PER_PAGE } from '@/constants';
import { getTotalActorCount } from '@/lib/actions/actor';
import React from 'react';

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const selectedPage = Number(searchParams?.page) || 1;
  const actorCount = await getTotalActorCount();
  const totalPages = Math.ceil(Number(actorCount) / ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Actors</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search actors..." />
        {/* <CreateCustomer /> */}
      </div>
      <ActorTable query={searchParams.query} currentPage={selectedPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default page;
