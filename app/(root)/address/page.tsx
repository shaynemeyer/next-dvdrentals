import Addresses from '@/components/Address/Addresses';
import React from 'react';

function page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const selectedPage = Number(searchParams?.page) || 1;

  return (
    <div>
      <Addresses />
    </div>
  );
}

export default page;
