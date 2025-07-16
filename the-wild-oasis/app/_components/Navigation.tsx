import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li className="hover:text-accent-400 transition-colors">
          <Link href={"/cabins"}>Cabins</Link>
        </li>
        <li className="hover:text-accent-400 transition-colors">
          <Link href={"/about"}>About</Link>
        </li>
        <li className="hover:text-accent-400 transition-colors">
          <Link href={"/account"}>Guest Area</Link>
        </li>
      </ul>
    </nav>
  );
}
