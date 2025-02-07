import Link from "next/link";
import { UserAvatar } from "../UserAvatar";
import { getUsersByUsername } from "@/actions/userModel";

export default async function UList({ username }: { username: string }) {
  const users = await getUsersByUsername(username);

  return (
    <>
      <p className="text-sm font-medium mb-2">Total users: {users?.length}</p>
      <ul className="divide-y h-[400px] overflow-y-scroll">
        {users && users?.length > 0 ? (
          users.map((item, i) => (
            <User
              key={i}
              username={item.username}
              email={item.email}
              image={item.image}
              id={item._id}
            />
          ))
        ) : (
          <p className="text-sm font-medium text-center w-full">
            No user found for: {username}
          </p>
        )}
      </ul>
    </>
  );
}

function User({
  image,
  id,
  username,
  email,
}: {
  image?: string;
  id?: string;
  username?: string;
  email: string;
}) {
  return (
    <div className="bg-background flex items-center gap-1.5 rounded-md my-1 py-2 px-1 sm:px-4 add-transition-300 hover:bg-secondary">
      <UserAvatar id={id} image={image} />
      <Link href={`/profile/${id}`} className="flex flex-col   w-full">
        <p className="text-sm font-medium">{username}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">{email}</p>
      </Link>
    </div>
  );
}
