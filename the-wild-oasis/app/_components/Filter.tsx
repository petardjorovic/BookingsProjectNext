"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ButtonFilter from "./ButtonFilter";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <ButtonFilter
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter={"all"}
      >
        All cabins
      </ButtonFilter>
      <ButtonFilter
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter={"small"}
      >
        1&mdash;3 guests
      </ButtonFilter>
      <ButtonFilter
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter={"medium"}
      >
        4&mdash;7 guests
      </ButtonFilter>
      <ButtonFilter
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter={"large"}
      >
        8&mdash;12 guests
      </ButtonFilter>
    </div>
  );
}
