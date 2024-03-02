import { deleteCity } from '@/lib/actions/city';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateCity() {
  return (
    <Link
      href="/city/create"
      className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create City</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCity({ city_id }: { city_id: string }) {
  return (
    <Link
      href={`/city/${city_id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Update City</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCity({ city_id }: { city_id: string }) {
  const deleteCityWithId = deleteCity.bind(null, city_id);

  return (
    <form action={deleteCityWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
