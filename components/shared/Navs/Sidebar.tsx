'use client';

import { navLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar-root">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <div className="flex flex-row">
            <Image src="/images/logo.png" alt="logo" width={42} height={42} />
            <h1 className="text-xl font-bold">DVD Rentals Inc.</h1>
          </div>
        </Link>

        <nav className="sidebar-nav">
          <ul className="sidebar-nav_elements">
            {navLinks.map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${
                    isActive ? 'bg-slate-600 text-white' : 'text-gray-500'
                  }`}
                >
                  <Link className="sidebar-link" href={link.route}>
                    {/* <Image
                      src={link.icon}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${isActive && 'brightness-200'}`}
                    /> */}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
