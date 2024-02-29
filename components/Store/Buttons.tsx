import { deleteStore } from '@/lib/actions/store';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateStore() {
  return (
    <Link
      href="/store/create"
      className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Store</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateStore({ store_id }: { store_id: string }) {
  return (
    <Link
      href={`/store/${store_id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Update Store</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteStore({ store_id }: { store_id: string }) {
  const deleteStoreWithId = deleteStore.bind(null, store_id);

  return (
    <form action={deleteStoreWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
