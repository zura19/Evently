import Link from "next/link";
import Logo from "../Logo";
import NavLinks from "./NavLinks";
import { UserAvatar } from "../UserAvatar";
import { auth } from "@/app/auth";
import { UserDropdown } from "./UserDropDown";
import { getUserById } from "@/actions/userModel";
import { Button } from "../ui/button";

export default async function Navbar() {
  const session = await auth();
  const user = await getUserById(session?.user?.id as string);

  return (
    <div className="sticky top-0 bg-background z-30 flex items-center border-b border-border py-4  ">
      <div className="container-box flex items-center justify-between w-full  ">
        <Link href="/" className="flex items-center">
          <Logo size="small" />
        </Link>

        <NavLinks userId={user?.id} role={user?.role} />
        {!session?.user || !user ? (
          <Button asChild>
            <Link href="/login" className="font-semibold">
              Login
            </Link>
          </Button>
        ) : (
          <UserDropdown
            role={user?.role as string}
            id={user._id as string}
            username={user?.username as string}
          >
            <UserAvatar image={user?.image as string} id={user?.id as string} />
          </UserDropdown>
        )}
      </div>
    </div>
  );
}
