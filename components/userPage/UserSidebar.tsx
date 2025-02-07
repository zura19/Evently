"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserSidebar({ id }: { id: string }) {
  return (
    <ul className="hidden sm:flex flex-col border-r border-border py-3 gap-1 pr-1">
      <SidebarLink link={`/profile/${id}`} name="Profile" />
      <SidebarLink link={`/profile/${id}/bookmarks`} name="Bookmarks" />
      <SidebarLink link={`/profile/${id}/tickets`} name="Tickets" />
    </ul>
  );
}

function SidebarLink({ link, name }: { link: string; name: string }) {
  const pathname = usePathname();
  return (
    <Link
      className={`${pathname === link && "text-primary font-semibold bg-secondary"} hover:bg-secondary font-medium  py-2 px-3 rounded-md add-transition-300`}
      href={link}
    >
      <div className="flex items-center justify-between">
        {name}

        <div
          className={`h-2.5 w-2.5 rounded-full bg-primary ${pathname === link ? "opacity-100  shadow-[0px_0px_14px_1px_#7c3aed] " : "opacity-0"} add-transition-300`}
        ></div>
      </div>
    </Link>
  );
}
