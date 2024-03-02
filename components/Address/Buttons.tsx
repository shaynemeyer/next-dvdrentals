import { deleteAddress } from '@/lib/actions/address';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateAddress() {
  return (
    <Link
      href="/address/create"
      className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Address</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAddress({ address_id }: { address_id: string }) {
  return (
    <Link
      href={`/address/${address_id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Update Address</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAddress({ address_id }: { address_id: string }) {
  const deleteAddressWithId = deleteAddress.bind(null, address_id);

  return (
    <form action={deleteAddressWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
