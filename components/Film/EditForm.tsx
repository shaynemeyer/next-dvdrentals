'use client';

import { updateFilm } from '@/lib/actions/city';
import Link from 'next/link';
import React from 'react';
import { useFormState } from 'react-dom';
import { Button } from '../ui/button';
import { FlagIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { FilmForm } from '@/types/Film';
import { CountryForm } from '@/types/Country';

function EditForm({ film }: { film: FilmForm }) {
  const initialState = { message: '', errors: {} };
  const updateFilmWithId = updateFilm.bind(null, film.film_id);
  const [state, dispatch] = useFormState(updateFilmWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6"></div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/film"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Film</Button>
      </div>
    </form>
  );
}

export default EditForm;
