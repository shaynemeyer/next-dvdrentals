'use client';

import { updateStaff } from '@/lib/actions/staff';
import Link from 'next/link';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import {
  AtSymbolIcon,
  MapPinIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { StaffForm } from '@/types/Staff';
import { AddressField } from '@/types/Address';
import { StoreField } from '@/types/Store';

function EditForm({
  staff,
  stores,
  addresses,
}: {
  staff: StaffForm;
  stores: StoreField[];
  addresses: AddressField[];
}) {
  const [isActive, setIsActive] = useState(staff.active);
  const initialState = { message: '', errors: {} };
  const updateStaffWithId = updateStaff.bind(null, staff.staff_id!);
  const [state, dispatch] = useFormState(updateStaffWithId, initialState);

  return (
    <form action={dispatch}>
      {/* First Name */}
      <div className="mb-4">
        <label htmlFor="first_name" className="mb-2 block text-sm font-medium">
          Enter first name
        </label>
        <div className="relative">
          <input
            required
            id="first_name"
            name="first_name"
            placeholder="Enter first name"
            defaultValue={staff.first_name}
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
            defaultValue={staff.last_name}
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

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Enter email
        </label>
        <div className="relative">
          <input
            required
            id="email"
            name="email"
            defaultValue={staff.email || ''}
            placeholder="Enter email address"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email &&
            state.errors.email.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* Username */}
      <div className="mb-4">
        <label htmlFor="username" className="mb-2 block text-sm font-medium">
          Enter username
        </label>
        <div className="relative">
          <input
            required
            id="username"
            name="username"
            placeholder="Enter username"
            defaultValue={staff.username}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.username &&
            state.errors.username.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* Address */}

      <div className="mb-4 w-[380px]">
        <label htmlFor="address_id" className="mb-2 block text-sm font-medium">
          Choose Address
        </label>
        <div className="relative">
          <select
            id="address_id"
            name="address_id"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={staff.address_id}
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
      {/* Store */}

      <div className="mb-4 w-[180px]">
        <label htmlFor="store_id" className="mb-2 block text-sm font-medium">
          Choose Store
        </label>
        <div className="relative">
          <select
            id="store_id"
            name="store_id"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={staff.store_id}
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

          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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

      {/* Active */}
      <div className="mb-4">
        <label htmlFor="active" className="mb-2 block text-sm font-medium">
          Is Active
        </label>
        <div className="relative">
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </div>

        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.active &&
            state.errors.active.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/staff"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Staff</Button>
      </div>
    </form>
  );
}

export default EditForm;
