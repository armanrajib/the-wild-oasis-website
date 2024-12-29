import { Suspense } from 'react';

import { getCabin, getCabins } from '@/app/_lib/data-service';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import Cabin from '@/app/_components/Cabin';

export async function generateMetadata({ params }) {
  const cabinId = (await params).cabinId;
  const cabin = await getCabin(cabinId);

  return {
    title: `Cabin ${cabin.name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}

export default async function Page({ params }) {
  const cabinId = (await params).cabinId;
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-500 mb-10">
          Reserve Cabin {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
