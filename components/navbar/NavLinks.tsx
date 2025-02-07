"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({
  role,
  userId,
}: {
  role?: string;
  userId: string;
}) {
  return (
    <>
      <ul className="hidden sm:flex items-center gap-8">
        <NavLink to="/" name="Home" />
        <NavLink to="/events" name="Events" />
        {userId && role !== "user" && (
          <NavLink to="/create" name="Create Event" />
        )}
      </ul>
    </>
  );
}

export function NavLink({ to, name }: { to: string; name: string }) {
  const pathName = usePathname();
  const isHere = pathName === to;

  return (
    <Link
      className={`${
        isHere && "text-primary "
      } hover:text-primary transition-all duration-300`}
      href={to}
    >
      {name}
      {
        <div
          className={`${
            isHere && "h-[1px] w-full rounded-full opacity-95"
          } hover:opacity-100 hover:h-[1px] hover:w-full rounded-full"
           transition-all duration-300 bg-primary`}
        ></div>
      }
    </Link>
  );
}
