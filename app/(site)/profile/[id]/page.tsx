import { getUserById } from "@/actions/userModel";
import { auth } from "@/app/auth";
import EditProfileModal from "@/components/userPage/EditProfileModal";
import UserImage from "@/components/userPage/UserImage";
import { Iuser } from "@/lib/types/userTypes";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const session = await auth();
  const { id: userId } = params;
  const havePermission =
    // @ts-expect-error role
    session?.user?.id === userId || session?.user?.role === "admin";
  if (!havePermission) return notFound();

  // @ts-expect-error role
  const isLoggedUserAdmin = session?.user?.role === "admin";

  const user: Iuser = await getUserById(userId);

  return (
    <div className="p-4 border-r border-border">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <UserImage
          userId={user._id}
          username={user.username}
          image={user.image}
        />
        <div className="flex flex-col">
          <p className="font-medium text-lg">{user.username}</p>
          <p className="font-medium text-lg">{user.email}</p>
        </div>
        {havePermission && (
          <EditProfileModal isLoggedUserAdmin={isLoggedUserAdmin} user={user} />
        )}
      </div>
    </div>
  );
}
