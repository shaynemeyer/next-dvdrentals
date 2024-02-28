import ActorTable from '@/components/Actor/ActorTable';
import { CreateActor } from '@/components/Actor/Buttons';
import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/search';
import { fetchActorPages } from '@/lib/actions/actor';
import React from 'react';

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams?.query || '';
  const selectedPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchActorPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Actors</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search actors..." />
        <CreateActor />
      </div>
      <ActorTable query={searchParams.query} currentPage={selectedPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default page;
