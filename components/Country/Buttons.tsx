import { deleteCountry } from '@/lib/actions/country';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateCountry() {
  return (
    <Link
      href="/country/create"
      className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Country</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCountry({ country_id }: { country_id: string }) {
  return (
    <Link
      href={`/country/${country_id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Update Country</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCountry({ country_id }: { country_id: string }) {
  const deleteCountryWithId = deleteCountry.bind(null, country_id);

  return (
    <form action={deleteCountryWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
