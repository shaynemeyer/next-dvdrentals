'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import CompanyLogo from './CompanyLogo';
import NavLinks from './NavLinks';

function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-slate-400 p-4 md:h-30"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <CompanyLogo />
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2"></div>
      <NavLinks />
    </div>

    //     <nav className="sidebar-nav">
    //       <ul className="sidebar-nav_elements">
    //         {navLinks.map((link) => {
    //           const isActive = link.route === pathname;

    //           return (
    //             <li
    //               key={link.route}
    //               className={`sidebar-nav_element group ${
    //                 isActive ? 'bg-slate-600 text-white' : 'text-gray-500'
    //               }`}
    //             >
    //               <Link className="sidebar-link" href={link.route}>
    //                 {/* <Image
    //                   src={link.icon}
    //                   alt="logo"
    //                   width={24}
    //                   height={24}
    //                   className={`${isActive && 'brightness-200'}`}
    //                 /> */}
    //                 {link.label}
    //               </Link>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </nav>
    //   </div>
    // </aside>
  );
}

export default Sidebar;
