'use client';

import { updateLanguage } from '@/lib/actions/languages';
import Link from 'next/link';
import React from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { LanguageForm } from '@/types/Language';

function EditForm({ language }: { language: LanguageForm }) {
  const initialState = { message: '', errors: {} };
  const updateLanguageWithId = updateLanguage.bind(null, language.language_id);
  const [state, dispatch] = useFormState(updateLanguageWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Enter name
          </label>
          <div className="relative">
            <input
              required
              id="name"
              name="name"
              placeholder="Enter name"
              defaultValue={language.name}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/language"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Language</Button>
      </div>
    </form>
  );
}

export default EditForm;
