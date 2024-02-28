import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getFilteredLanguages } from '@/lib/actions/languages';
import { DeleteLanguage, UpdateLanguage } from './Buttons';

async function LanguageTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const languages = await getFilteredLanguages(query, currentPage);

  return (
    <Table className="bg-white mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {languages.map((language) => (
          <TableRow key={language.language_id}>
            <TableCell className="w-[30px]">{language.language_id}</TableCell>
            <TableCell>{language.name}</TableCell>
            <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="flex justify-end gap-3">
                <UpdateLanguage language_id={`${language.language_id}`} />
                <DeleteLanguage language_id={`${language.language_id}`} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default LanguageTable;
