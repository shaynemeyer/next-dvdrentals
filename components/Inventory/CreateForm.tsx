'use client';

import { createInventory } from '@/lib/actions/inventory';
import Link from 'next/link';
import React from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import { FilmIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { FilmField } from '@/types/Film';
import { StoreField } from '@/types/Store';

function CreateForm({
  films,
  stores,
}: {
  films: FilmField[];
  stores: StoreField[];
}) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createInventory, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Film */}
        <div className="mb-4">
          <div className="mb-4 w-[380px]">
            <label htmlFor="film_id" className="mb-2 block text-sm font-medium">
              Choose Film
            </label>
            <div className="relative">
              <select
                id="film_id"
                name="film_id"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="customer-error"
              >
                <option value="" disabled>
                  Select an film
                </option>

                {films.map((film) => (
                  <option key={film.film_id} value={film.film_id}>
                    {film.title}
                  </option>
                ))}
              </select>

              <FilmIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>

            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.film_id &&
                state.errors.film_id.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Store */}
        <div className="mb-4 w-[180px]">
          <label htmlFor="store_id" className="mb-2 block text-sm font-medium">
            Choose Store
          </label>
          <div className="relative">
            <select
              id="store_id"
              name="store_id"
              defaultValue=""
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select store
              </option>

              {stores &&
                stores.map((member) => (
                  <option key={member.store_id} value={member.store_id}>
                    {member.store_id}
                  </option>
                ))}
            </select>

            <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.store_id &&
              state.errors.store_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/inventory"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Inventory</Button>
      </div>
    </form>
  );
}

export default CreateForm;
