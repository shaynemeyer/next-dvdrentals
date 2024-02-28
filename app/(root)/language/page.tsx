import React from 'react';
import { fetchLanguagePages } from '@/lib/actions/languages';
import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/search';
import LanguageTable from '@/components/Language/LanguageTable';
import { CreateLanguage } from '@/components/Language/Buttons';

async function LanguagePage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams?.query || '';
  const selectedPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchLanguagePages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Language</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search languages..." />
        <CreateLanguage />
      </div>
      <LanguageTable query={searchParams.query} currentPage={selectedPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default LanguagePage;
