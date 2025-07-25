import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

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
          {session?.user?.image ? (
            <Link href={"/account"} className="flex items-center gap-4">
              <img
                src={session.user.image}
                alt={session.user.name || "user-avatar"}
                className="rounded-full h-8"
                referrerPolicy="no-referrer"
              />
              <span>Guest Area</span>
            </Link>
          ) : (
            <Link href={"/account"}>Guest Area</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
