'use client';

import { updateStore } from '@/lib/actions/store';
import Link from 'next/link';
import React from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import { MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { StaffField } from '@/types/Staff';
import { AddressField } from '@/types/Address';
import { StoreForm } from '@/types/Store';

function EditForm({
  store,
  staff,
  addresses,
}: {
  store: StoreForm;
  staff: StaffField[];
  addresses: AddressField[];
}) {
  const initialState = { message: '', errors: {} };
  const updateStoreWithId = updateStore.bind(null, store.store_id);
  const [state, dispatch] = useFormState(updateStoreWithId, initialState);

  return (
    <form action={dispatch}>
      {/* Manager */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4 w-[180px]">
          <label
            htmlFor="manager_staff_id"
            className="mb-2 block text-sm font-medium"
          >
            Choose Manager
          </label>
          <div className="relative">
            <select
              id="manager_staff_id"
              name="manager_staff_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={store.manager_staff_id}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select staff
              </option>

              {staff &&
                staff.map((member) => (
                  <option key={member.staff_id} value={member.staff_id}>
                    {member.first_name} {member.last_name}
                  </option>
                ))}
            </select>

            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.manager_staff_id &&
              state.errors.manager_staff_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      {/* Address */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4 w-[380px]">
          <label
            htmlFor="address_id"
            className="mb-2 block text-sm font-medium"
          >
            Choose Address
          </label>
          <div className="relative">
            <select
              id="address_id"
              name="address_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={store.address_id}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select an address
              </option>

              {addresses &&
                addresses.map((address) => (
                  <option key={address.address_id} value={address.address_id}>
                    {address.address}
                  </option>
                ))}
            </select>

            <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.address_id &&
              state.errors.address_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/store"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Store</Button>
      </div>
    </form>
  );
}

export default EditForm;
