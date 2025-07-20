// import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import { CabinPreview } from "../_lib/validationSchemas";
import CabinCard from "./CabinCard";

type CabinListProps = {
  filter: string;
};

export default async function CabinList({ filter }: CabinListProps) {
  // noStore();
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let filteredCabins: CabinPreview[] = [];

  if (filter === "all") filteredCabins = cabins;
  if (filter === "small")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 8 && cabin.maxCapacity <= 12
    );

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
