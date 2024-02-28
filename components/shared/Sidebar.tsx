'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import CompanyLogo from './CompanyLogo';
import NavLinks from './NavLinks';
import { PowerIcon } from '@heroicons/react/24/outline';

function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-gray-500 p-4 md:h-30"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <CompanyLogo />
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>

        <form
          action={() => {
            console.log('form action');
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-gray-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
