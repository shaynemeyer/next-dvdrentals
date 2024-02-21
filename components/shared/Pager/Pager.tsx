'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname } from 'next/navigation';

type PagerProps = {
  totalCount?: number;
  selectedPage?: string;
};

function Pager({ totalCount = 0, selectedPage = '1' }: PagerProps) {
  const pathname = usePathname();

  const pagesLimit = 10;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem hidden={true}>
          <PaginationPrevious href="#" />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href={`${pathname}?page=${selectedPage}`}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`${pathname}?page=${selectedPage + 1}`}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`${pathname}?page=${selectedPage + 2}`}>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem hidden={true}>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Pager;
