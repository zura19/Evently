import { auth } from "@/app/auth";
import FindUserList from "@/components/findUserPage/FindUserList";
import UserInput from "@/components/findUserPage/UserInput";
import { notFound } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: { username: string };
}) {
  const session = await auth();
  //   @ts-expect-error role
  if (!session?.user || session.user.role !== "admin") return notFound();

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15  to-primary/0 h-[90dvh]">
      <div className="container-box py-6">
        <UserInput />
        <FindUserList username={searchParams.username} />
      </div>
    </div>
  );
}
