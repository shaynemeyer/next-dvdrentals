'use client';

import { createCity } from '@/lib/actions/city';
import Link from 'next/link';
import React from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import { FlagIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { CountryForm } from '@/types/Country';

function CreateForm({ countries }: { countries: CountryForm[] }) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createCity, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* City */}
        <div className="mb-4">
          <label htmlFor="city" className="mb-2 block text-sm font-medium">
            Enter city
          </label>
          <div className="relative">
            <input
              required
              id="city"
              name="city"
              placeholder="Enter a city"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.city &&
              state.errors.city.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Countries */}
        <div className="mb-4 w-[380px]">
          <label
            htmlFor="country_id"
            className="mb-2 block text-sm font-medium"
          >
            Choose Country
          </label>
          <div className="relative">
            <select
              id="country_id"
              name="country_id"
              defaultValue=""
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select an country
              </option>

              {countries &&
                countries.map((country) => (
                  <option key={country.country_id} value={country.country_id}>
                    {country.country}
                  </option>
                ))}
            </select>

            <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.country_id &&
              state.errors.country_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/city"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create City</Button>
      </div>
    </form>
  );
}

export default CreateForm;
