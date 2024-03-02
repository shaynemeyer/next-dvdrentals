import { deleteStaff } from '@/lib/actions/staff';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateStaff() {
  return (
    <Link
      href="/staff/create"
      className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Staff</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateStaff({ staff_id }: { staff_id: string }) {
  return (
    <Link
      href={`/staff/${staff_id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Update Staff</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteStaff({ staff_id }: { staff_id: string }) {
  const deleteStaffWithId = deleteStaff.bind(null, staff_id);

  return (
    <form action={deleteStaffWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
