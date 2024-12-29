'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter) {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set('capacity', filter);
    router.replace(`${pathname}?${urlSearchParams.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button filter="all" activeFilter={activeFilter} onFilter={handleFilter}>
        All cabins
      </Button>
      <Button
        filter="small"
        activeFilter={activeFilter}
        onFilter={handleFilter}
      >
        1&mdash;2 guests
      </Button>
      <Button
        filter="medium"
        activeFilter={activeFilter}
        onFilter={handleFilter}
      >
        3&mdash;4 guests
      </Button>
      <Button
        filter="large"
        activeFilter={activeFilter}
        onFilter={handleFilter}
      >
        5&mdash;6 guests
      </Button>
    </div>
  );
}

function Button({ filter, activeFilter, onFilter, children }) {
  return (
    <button
      onClick={() => onFilter(filter)}
      className={`${
        activeFilter === filter && 'bg-primary-700 text-primary-50'
      } px-5 py-2 hover:bg-primary-700`}
    >
      {children}
    </button>
  );
}
