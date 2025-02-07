import { Suspense } from "react";
import UserSkeleton from "../skeletons/UserSkeleton";
import UList from "./UList";

export default async function FindUserList({ username }: { username: string }) {
  if (!username)
    return (
      <div className="rounded-md bg-background p-4 mt-8">
        <p className="text-sm font-semibold bg-green-white mb-2 h-5"></p>
        <ul className="flex items-center justify-center h-[400px]">
          <p className="text-sm font-medium">Start typing to find users</p>
        </ul>
      </div>
    );
  return (
    <div className="rounded-md bg-background  p-2 sm:p-4 mt-8">
      <p className="text-sm font-semibold mb-2"></p>
      <Suspense key={username} fallback={<UserSkeleton count={7} />}>
        <UList username={username} />
      </Suspense>
    </div>
  );
}
