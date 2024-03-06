import React from 'react';
import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/search';
import PaymentTable from '@/components/Payment/PaymentTable';
import { fetchPaymentPages } from '@/lib/actions/payment';
import { getStoresForDisplay } from '@/lib/actions/store';

async function PaymentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams?.query || '';
  const selectedPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPaymentPages(query);
  const stores = await getStoresForDisplay();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Payments</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search payments..." />
      </div>
      <PaymentTable
        query={searchParams.query}
        currentPage={selectedPage}
        stores={stores}
      />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default PaymentPage;
