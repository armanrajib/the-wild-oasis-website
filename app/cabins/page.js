import { Suspense } from 'react';

import CabinList from '@/app/_components/CabinList';
import Spinner from '@/app/_components/Spinner';
import Filter from '@/app/_components/Filter';

// Revalidate the data cache and full route cache
// export const revalidate = 3600; // Every hour
// Components which receive searchParams are dynamic (revalidate doesn't apply to them)

export const metadata = {
  title: 'Cabins',
};

export default async function Page({ searchParams }) {
  const filter = (await searchParams)?.capacity ?? 'all';

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* key prop is used to activate the Suspense boundary when the filter changes */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}

// All the server and client components runs (renders) on the server in the initial render.
