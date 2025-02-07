import { signOutAction } from "@/actions/authActions";
// prettier-ignore
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function UserDropdown({
  children,
  id,
  username,
  role,
}: {
  children: React.ReactNode;
  id: string;
  role: string;
  username: string;
}) {
  const signOut = async () => {
    "use server";
    await signOutAction();
  };

  if (!id || !username) return null;
  if (id && username)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ">
          <DropdownMenuLabel>{username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/profile/${id}`}>Profile</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={`/profile/${id}/bookmarks`}>Bookmarks</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={`/profile/${id}/tickets`}>Tickets</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/events`}>Events</Link>
          </DropdownMenuItem>

          {role === "admin" && (
            <DropdownMenuItem asChild>
              <Link href={`/users`}>Users</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild disabled={role === "user"}>
            <Link href={`/create`}>Create event</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <form className="w-full h-full  px-2 py-1.5" action={signOut}>
              <button className="w-full">Log out</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}
