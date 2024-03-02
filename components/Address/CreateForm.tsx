'use client';

import { createAddress } from '@/lib/actions/address';
import Link from 'next/link';
import React from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import {
  MapPinIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { CityField } from '@/types/City';

function CreateForm({ cities = [] }: { cities: CityField[] }) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createAddress, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Enter address
          </label>
          <div className="relative">
            <input
              required
              id="address"
              name="address"
              placeholder="Enter a address"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.address &&
              state.errors.address.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Address 2 */}
        <div className="mb-4">
          <label htmlFor="address2" className="mb-2 block text-sm font-medium">
            Enter address 2
          </label>
          <div className="relative">
            <input
              id="address2"
              name="address2"
              placeholder="Enter a address 2"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.address2 &&
              state.errors.address2.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* District */}
        <div className="mb-4">
          <label htmlFor="district" className="mb-2 block text-sm font-medium">
            Enter district
          </label>
          <div className="relative">
            <input
              required
              id="district"
              name="district"
              placeholder="Enter a district"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.district &&
              state.errors.district.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Cities */}
        <div className="mb-4 w-[380px]">
          <label htmlFor="city_id" className="mb-2 block text-sm font-medium">
            Choose City
          </label>
          <div className="relative">
            <select
              id="city_id"
              name="city_id"
              defaultValue=""
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select an city
              </option>

              {cities &&
                cities.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city}
                  </option>
                ))}
            </select>

            <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.city_id &&
              state.errors.city_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Postal Code */}
        <div className="mb-4">
          <label
            htmlFor="postal_code"
            className="mb-2 block text-sm font-medium"
          >
            Enter postal code
          </label>
          <div className="relative">
            <input
              id="postal_code"
              name="postal_code"
              placeholder="Enter a postal code"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.postal_code &&
              state.errors.postal_code.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Enter phone number
          </label>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              placeholder="Enter a phone number"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.phone &&
              state.errors.phone.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/address"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Address</Button>
      </div>
    </form>
  );
}

export default CreateForm;
