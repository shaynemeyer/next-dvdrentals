import { deleteCategory } from '@/lib/actions/category';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateCategory() {
  return (
    <Link
      href="/category/create"
      className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Category</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCategory({ category_id }: { category_id: string }) {
  return (
    <Link
      href={`/category/${category_id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Update Category</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCategory({ category_id }: { category_id: string }) {
  const deleteCategoryWithId = deleteCategory.bind(null, category_id);

  return (
    <form action={deleteCategoryWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
