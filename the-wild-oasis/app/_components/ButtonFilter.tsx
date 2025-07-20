import { ReactNode } from "react";

type ButtonFilterProps = {
  handleFilter: (filter: string) => void;
  activeFilter: string;
  children: ReactNode;
  filter: string;
};

export default function ButtonFilter({
  handleFilter,
  activeFilter,
  children,
  filter,
}: ButtonFilterProps) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
