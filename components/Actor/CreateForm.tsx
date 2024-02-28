'use client';

import { createActor } from '@/lib/actions/actor';
import Link from 'next/link';
import React from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import { UserCircleIcon } from '@heroicons/react/24/outline';

function CreateForm() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createActor, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* First Name */}
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="mb-2 block text-sm font-medium"
          >
            Enter first name
          </label>
          <div className="relative">
            <input
              required
              id="first_name"
              name="first_name"
              placeholder="Enter first name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.first_name &&
              state.errors.first_name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="last_name" className="mb-2 block text-sm font-medium">
            Enter last name
          </label>
          <div className="relative">
            <input
              required
              id="last_name"
              name="last_name"
              placeholder="Enter last name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.last_name &&
              state.errors.last_name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/actor"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Actor</Button>
      </div>
    </form>
  );
}

export default CreateForm;
