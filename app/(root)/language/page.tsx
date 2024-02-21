import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllLanguages } from '@/lib/actions/languages';

async function LanguagePage() {
  const languages = await getAllLanguages();

  return (
    <div>
      <h1>Language</h1>
      <Table>
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
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LanguagePage;
