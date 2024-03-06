import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/constants';

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {/* Home */}
      {navLinks.slice(0, 1).map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.route}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-gray-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-500 text-white': pathname === link.route,
              }
            )}
          >
            {LinkIcon && <LinkIcon className="w-6" />}
            <p className="hidden md:block">{link.label}</p>
          </Link>
        );
      })}
      <div className="mt-4">
        <h2 className="pt-2">DVDs</h2>
      </div>
      {/* DVDs */}
      {navLinks.slice(1, 5).map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.route}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-gray-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-500 text-white': pathname === link.route,
              }
            )}
          >
            {LinkIcon && <LinkIcon className="w-6" />}
            <p className="hidden md:block">{link.label}</p>
          </Link>
        );
      })}

      <div className="mt-4">
        <h2 className="pt-2">Customers</h2>
      </div>
      {/* Customers */}
      {navLinks.slice(5, 9).map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.route}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-gray-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-500 text-white': pathname === link.route,
              }
            )}
          >
            {LinkIcon && <LinkIcon className="w-6" />}
            <p className="hidden md:block">{link.label}</p>
          </Link>
        );
      })}

      <div className="mt-4">
        <h2 className="pt-2">Admin Stuff</h2>
      </div>
      {/* Customers */}
      {navLinks.slice(9, 15).map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.route}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-gray-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-500 text-white': pathname === link.route,
              }
            )}
          >
            {LinkIcon && <LinkIcon className="w-6" />}
            <p className="hidden md:block">{link.label}</p>
          </Link>
        );
      })}
    </>
  );
}
