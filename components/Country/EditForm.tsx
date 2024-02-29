'use client';

import { updateCountry } from '@/lib/actions/country';
import Link from 'next/link';
import React from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { CountryForm } from '@/types/Country';

function EditForm({ country }: { country: CountryForm }) {
  const initialState = { message: '', errors: {} };
  const updateCountryWithId = updateCountry.bind(null, country.country_id);
  const [state, dispatch] = useFormState(updateCountryWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="country" className="mb-2 block text-sm font-medium">
            Enter country
          </label>
          <div className="relative">
            <input
              required
              id="country"
              name="country"
              placeholder="Enter country"
              defaultValue={country.country}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.country &&
              state.errors.country.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/country"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Country</Button>
      </div>
    </form>
  );
}

export default EditForm;
